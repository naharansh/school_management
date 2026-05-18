import { RefreshCwIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Field, FieldDescription } from "../../components/ui/field";
import { Button } from "../../components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../../components/ui/input-otp";

export const Verify_Otp = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center  px-4">
      <Card className="w-full max-w-sm shadow-lg rounded-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl font-semibold">Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6 digit code sent to your email
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Field>
            <InputOTP maxLength={6} id="otp-verification" >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot
                  index={0}
                  className="w-10 h-10 text-md rounded-md border ms-1"
                />
                <InputOTPSlot
                  index={1}
                  className="w-10 h-10 text-md rounded-md border ms-1"
                />
                <InputOTPSlot
                  index={2}
                  className="w-10 h-10 text-md rounded-md border ms-2"
                />
                 <InputOTPSlot
                  index={3}
                  className="w-10 h-10 text-md rounded-md border ms-2"
                />
                <InputOTPSlot
                  index={4}
                  className="w-10 h-10 text-md rounded-md border ms-2"
                />
                <InputOTPSlot
                  index={5}
                  className="w-10 h-10 text-md rounded-md border ms-2"
                />
              </InputOTPGroup>

           
            </InputOTP>
          </Field>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Verify Code</Button>

          <FieldDescription className="text-center">
            Didn&apos;t receive the code? resend
          </FieldDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
