import { GoogleLogo } from "../Components/Authentication/GoogleLogo"
import { Login } from "../Components/Authentication/Login"
import { Signup } from "../Components/Authentication/Signup"
import { signInWithGoogle } from "../services/authService"

const Authentication = ({authType}) => {
    console.log(authType)
    return (
        <main className="w-full flex">
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
                <div
                    className="absolute inset-0 my-auto h-[500px]"
                    style={{
                        background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
                    }}
                >

                </div>
            </div>
            {authType === 'login'?<Login/>:<Signup/>}
        </main>
    )
}

export {Authentication}