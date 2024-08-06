import { Login } from "../Components/Authentication/Login"
import { Signup } from "../Components/Authentication/Signup"

//Authentication Page. Display either login or signup page based on route.

const Authentication = ({authType}) => {

    //Reverse the direction of the children container depending on route.
    const mainClasses = `w-full flex ${authType === 'login' ? 'flex-row-reverse' : ''}`; 


    return (
        <>
        <main className={mainClasses}>
                <div className="relative flex-1 hidden  h-screen bg-gray-900  lg:flex">
                    <div
                        className="absolute inset-0 my-auto h-[500px]"
                        style={{
                            background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
                        }}
                    >

                    </div>
                    {authType === 'login'?
                    (                
                    <div className="flex-col h-[100%] w-[100%]">
                        <div className="z-10 font-bold text-m ml-[20%] mt-[20%] text-white">BranchSelector</div>
                        <div className="text-4xl  text-white   ml-[20%] mt-[30px]">Welcome Back! 👋</div>
                        <div className="text-xl font-bold  text-gray-500   ml-[20%] mt-[30px] mr-[20%]">Login to continue your personalized journey towards your dream career.</div>
                    </div>):
                    (
                    <div className="flex-col h-[100%] w-[100%]">
                        <div className="z-10 font-bold text-m ml-[20%] mt-[20%] text-white">BranchSelector</div>
                        <div className="text-4xl  text-white   ml-[20%] mt-[30px]">Hey there! 👋</div>
                        <div className="text-xl font-bold  text-gray-500   ml-[20%] mt-[30px] mr-[20%]">Sign up to unlock a personalized journey towards your dream career.</div>
                    </div>
                    )}
                </div>
                {authType === 'login'?<Login/>:<Signup/>}
            </main>
            </>
        )
}

export {Authentication}