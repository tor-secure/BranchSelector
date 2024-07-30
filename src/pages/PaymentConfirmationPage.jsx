import { useLocation } from "react-router-dom"
import suceessSvg from "../assets/success.svg"
import { FaArrowLeft } from "react-icons/fa"

const PaymentConfirmationPage = () => {

    const location = useLocation()
    const {planDetail, appointmentDetail, paymentDetail,receiptId} = location.state

    console.log(planDetail,appointmentDetail,paymentDetail)

    return(
        <div className="flex flex-col h-full max-w-3xl min-h-lvh lg:mx-auto md:mx-auto sm:m-2 p-8 font-poppins text-center border-2 rounded-lg">
            <img src = {suceessSvg} className="size-32 self-center"/>
            <span className="text-2xl font-bold text-blue-600 mt-5">Payment Confirmed!</span>
            <span className="mt-3 text-3xl font-bold">{paymentDetail.currency+'  '+paymentDetail.amount}</span>
            <span className="mt-3 text-lg font-bold">{planDetail.title}</span>
            <span className="mt-3 text-md font-bold">Your order has been successfully placed!</span>
            <span className="mt-10 text-sm font-bold text-blue-600">Receipt ID<br/><span className="text-black">{receiptId}</span></span>
            <span className="mt-10 text-sm text-wrap break-words">For queries, contact:<br/> educatorananth@gmail.com<br/>+91 8951511111</span>
            <div className="mb-10 flex self-center mt-10" href='/'>
                <FaArrowLeft color="367af3" className="mr-2 mt-1"/>
                <a href='/' className="text-lg font-bold text-[#367af3]">Go to home page</a>
            </div>
        </div>
    )

}

export {PaymentConfirmationPage};