import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../../components/ui/field";
import { Button } from "../../components/ui/button";
import { Mail, Lock } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { api_url } from "../../utils/utilts";
import { useSnackbar } from "notistack";
export const Login = () => {
  const [login, setlogin] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setlogin((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(login);
    console.log(`${api_url}/user/login`);
    try {
      const res = axios
        .post(`${api_url}/user/login`, login)
        .then((res) => {
          enqueueSnackbar("Login Successful!", {
            variant: "success",
          });

          navigate("/sendotp");
          // console.log(res)
        })
        .catch((err) => {
          enqueueSnackbar(
            "Login failed. Please check your credentials and try again.",
            {
              variant: "error",
            },
          );
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full min-h-screen  flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-xl  rounded-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Student Management App
            </CardTitle>
            <CardDescription className="text-sm">
              Login with your email and password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <FieldGroup>
                {/* Email */}
                <Field className="space-y-2">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      className="pl-9"
                      required
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                </Field>

                {/* Password */}
                <Field className="space-y-2">
                  <div className="flex justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-9"
                      required
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                </Field>

                {/* Button */}
                <Field>
                  <Button className="w-full mt-2">Login</Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
