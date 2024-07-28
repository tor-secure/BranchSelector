import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
    
    const handleSubmit = async (event) =>{
        console.log("Sub")
        event.preventDefault()
        const result = await resetPassword(event.target.elements.email.value)
        console.log(result)
        if(result.status == 'success')
        toast.success("Email Sent!")
        else
        toast.error(result.message)

    }


    return (
        <>
        <main className='w-full flex'>
                <div className="relative flex-1 hidden  h-screen bg-gray-900  lg:flex">
                    <div
                        className="absolute inset-0 my-auto h-[500px]"
                        style={{
                            background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
                        }}
                    >

                    </div>
                        <div className="flex-col h-[100%] w-[100%]">
                        <div className="z-10 font-bold text-m ml-[20%] mt-[20%] text-white">BranchSelector</div>
                        <div className="text-4xl  text-white   ml-[20%] mt-[30px]">Reset Password</div>
                    </div>
                </div>

                <div className="flex-1 flex lg:items-center justify-center h-screen">
                    <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                        <p className="font-bold">
                            Enter the Email ID linked to your account. You will be sent a link to reset your password.
                        </p>

                        <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        >
                            <div>
                                <label className="font-medium">Email</label>
                                <input
                                name="email"
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>

                            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                                Reset Password
                            </button>
                            <div className="mb-10 flex " href='/'>
                                <FaArrowLeft color="367af3" className="mr-2 mt-1"/>
                                <a href='/' className="text-md font-bold text-[#367af3]">Go to home page</a>
                            </div>
                        </form> 
                    </div>
                </div>
            </main>
        </>
    )

}

export {ForgotPasswordPage}