import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState } from "react";
import axios from "axios";
import { api_url } from "../../utils/utilts";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const Export_Otp = () => {
    const [phone, setPhone] = useState("")
    const { enqueueSnackbar } = useSnackbar();
    const navigate= useNavigate() 
    const handleChange=(e)=>{
        e.preventDefault()
        alert(phone)
        axios.post(`${api_url}/user/mobile`,{phone}).then((res)=>{
            enqueueSnackbar("OTP sent successfully!", {
            variant: "success",
          });

            navigate("/otp")
        }).catch((err)=>{
            console.log(err)
            enqueueSnackbar("Failed to send OTP. Please try again.", {
            variant: "error",
          });
            alert("Failed to send OTP. Please try again.")
        })
    }
  return (
    <>
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <Card className="w-full max-w-sm shadow-none rounded-sm border-none">
    
    {/* Header */}
    <CardHeader className="text-center space-y-1 pb-2">
      <CardTitle className="text-2xl font-semibold">
        Verify Mobile
      </CardTitle>
      <p className="text-sm text-gray-500">
        Enter your mobile number to receive OTP
      </p>
    </CardHeader>

    {/* Content */}
    <CardContent className="space-y-5">
      <form className="space-y-4" onSubmit={handleChange}>

        {/* Label */}
        <Label className="text-sm font-medium">
          Mobile Number
        </Label>

        {/* Input Row */}
        <div className="flex items-center gap-2">
          
          {/* Country Code */}
        <PhoneInput
              defaultCountry="IN"
              value={phone}
              onChange={(value) => setPhone(value)}
              placeholder="Enter phone number"
              className="w-full outline-none text-lg border border-1 px-3"
            />

          {/* Phone Input */}
          
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Send OTP
        </button>

      </form>

      {/* Footer */}
      <p className="text-xs text-center text-gray-400">
        We’ll send a verification code to your number
      </p>

    </CardContent>
  </Card>
</div>
    </>
  );
};
