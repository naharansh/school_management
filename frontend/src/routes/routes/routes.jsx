import { Route, Routes } from "react-router-dom"
import { Login } from "../../pages/auth/login"
import { Verify_Otp } from "../../pages/auth/otp"
import { Export_Otp } from "../../pages/auth/sendotp"

export const App_Routes=()=>{
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
             <Route path="/sendotp" element={<Export_Otp/>}/>
             <Route path="/otp" element={<Verify_Otp/>}/>
        </Routes>
    )
}