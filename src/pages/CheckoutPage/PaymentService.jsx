import { toast } from "react-toastify";
import { getCurrentUserInfo } from "../../services/userService";


const verifyPayment = async (
  userDetails,
  planDetails,
  appointmentDetails,
  paymentDetails,
  loaderHandler, // To stop loading once payment is verified
  navigate //navigate handler is required to be passed from a react component as it cannot be created here
  ) => {
    /* 

    This function is called after the payment is completed on Razorpay's Checkout component.

    It essentially makes an API call to a cloudflare worker where the payment status and order status are confirmed as paid.

    The cloudflare worker is also responsible for the database updates wrt to users credit, transaction record storage and 
    receipt id generation.

    Once sucessfull response is recived, redirect user to payment confirmation page.

    */
    const toastId = toast.loading("Verifying payment...", {
      autoClose: false,
      draggable: true,
    });

    try {
      const response = await fetch(
        "https://verify-credit-purchase.branchselector.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            'userDetails':userDetails,
            'planDetails':planDetails,
            'appointmentDetails':appointmentDetails,
            'paymentDetails':paymentDetails
          }),
        }
      );

      const data = await response.json();
      loaderHandler(false)
      if (data.status === "success") {

        navigate('/paymentConfirmation',{state:{planDetail:planDetails,appointmentDetail:appointmentDetails, paymentDetail:paymentDetails, receiptId:data.receipt_id}})
  
        toast.update(toastId, {
          
          render: `Payment verified successfully! ${planDetails.credits} credits have been added to your account!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          draggable: true,
        });
      } 
      
      else {
        toast.update(toastId, {
          render: data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          draggable: true,
        });
      }
    } 
    catch (error) {
      console.error("Error verifying payment:", error);
      toast.update(toastId, {
        render: "Error verifying payment.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true,
      });
    }
  };

  const handlePayment = async (plan,appointmentDetails,paymentDetails,loaderHandler,navigate) => {

    /*

      This function is used to create an order on Razorpay through a cloudflare worker and then execute the order through
      Razorpay's Checkout SDK.

      Essentially, the plan details selelected by the user are sent to the cloudflare worker where using the Razorpay api, 
      a new order is created. The order ID is then returned back. This order ID is used by the Razorpay Checkout Component to 
      enable payments.

      Once payment is completed, its verified through the verifyPayment function.

    */

    const toastId = toast.loading("Contacting Payment Gateway...", {
      autoClose: false,
      draggable: true,
    });

    try {
      const userDetails = await getCurrentUserInfo();

      const response = await fetch(
        "https://payment-gateway.branchselector.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentDetails: paymentDetails,
            plan:plan
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.update(toastId, {
          render: "Redirected to payment gateway successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          draggable: true,
        });

        const options = {
          key_id: "rzp_live_EDnbw5QpCBwgp0",
          amount: paymentDetails.amount * 100, // Amount in lowest denomination (paise/cents)
          currency: paymentDetails.currency,
          name: "SurePass Academy",
          description: plan.title,
          order_id: data.razorpayOrder.id, // Razorpay Order ID recived from Worker
          handler: async function (response) {
            
            let tempUserDetails = {"uid":userDetails.uid,"name":userDetails.displayName,"email":userDetails.email}
            paymentDetails.razorpay_payment_id = response.razorpay_payment_id
            paymentDetails.razorpay_order_id = response.razorpay_order_id
            paymentDetails.razorpay_signature = response.razorpay_signature

            await verifyPayment(
              tempUserDetails, plan, appointmentDetails,paymentDetails,loaderHandler,navigate
            );
          },
          prefill: {
            name: userDetails.displayName,
            email: userDetails.email,
          },
          notes: {
            address:
              "9, II, Manasa Tower, PVS Junction, Kodailbail, Mangaluru, Karnataka 575003",
          },
          theme: {
            color: "#F37254",
          },
          modal:{
            "ondismiss":()=>{loaderHandler(false)}
          }
        };

        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          loaderHandler(false)
          toast.error(`Payment Failed: ${response.error.description}`, {
            autoClose: 3000,
            draggable: true,
          });
        });
        rzp1.open();
      } else {
        toast.update(toastId, {
          render: data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          draggable: true,
        });
      }
    } catch (error) {
      loaderHandler(false)
      toast.update(toastId, {
        render: "Error processing payment.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true,
      });
      console.error("Error processing payment:", error);
    }
  };


export {handlePayment, verifyPayment}
