import {
  EmailAddressLogIn,
  Password,
  ConfirmPassword,
  DunzoLogin,
  SignUpToAccount,
  Username,
  AlreadyHaveAnAccount,
  AuthSignIn,
  FirstName,
  LastName,
  SignUp,
} from "@/Constant/constant";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../public/assets/images/logo/logo.png";
import Image from "next/image";
import { UserSocialApp } from "./UserSocialApp";
import { signin } from "@/app/actions/auth/signin";
import {
  ApiErrorResponse,
  ErrorValidation,
  LoginSuccessResponse,
} from "@/Types/ApiResponseType";
import { SigninSchema } from "@/app/lib/definitions";
import { useFormStatus } from "react-dom";
import DisplayError from "@/utils/DisplayError";
import { signup } from "@/app/actions/auth/signup";

export const UserFormSignup = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("test1@test.com");
  const [password, setPassword] = useState("test");
  const [passwordConfirm, setPasswordConfirm] = useState("test");

  const [isLoading, setIsLoading] = useState(false);
  const [errorsValidation, setErrorsValidation] = useState<
    ErrorValidation[] | null
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const formSubmitHandle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorsValidation([]);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await signup(formData);

      if ("errorMessage" in response) {
        setErrorsValidation(response.errorsValidation);
        setErrorMessage(response.errorMessage);
      } else {
        toast.success(response.message, {
          // position: "top-right",
          autoClose: 2000, // 2 seconds delay before redirect
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setErrorsValidation(null);
        setErrorMessage("");
        Cookies.remove("dunzo_token");
        localStorage.clear();
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <Link className="logo" href="/dashboard/default">
          <Image
            priority
            width={120}
            height={38}
            className="img-fluid for-light"
            src={imageOne}
            alt="signup page"
          />
          <Image
            priority
            width={120}
            height={38}
            className="img-fluid for-dark"
            src={imageTwo}
            alt="signup page"
          />
        </Link>
      </div>
      <div className="login-main">
        <Form
          className="theme-form"
          onSubmit={(event) => formSubmitHandle(event)}
        >
          <h4>{SignUpToAccount}</h4>
          {errorMessage && <p style={{ color: "red" }}> {errorMessage} </p>}
          <FormGroup>
            <Label className="col-form-label">{FirstName}</Label>
            <Input
              name="firstName"
              type="text"
              defaultValue={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="John"
            />
            <DisplayError
              errorsValidation={errorsValidation || []}
              keyProp="firstName"
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{LastName}</Label>
            <Input
              name="lastName"
              type="text"
              defaultValue={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="John"
            />
            <DisplayError
              errorsValidation={errorsValidation || []}
              keyProp="lastName"
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{EmailAddressLogIn}</Label>
            <Input
              name="email"
              type="email"
              defaultValue={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Test123@gmail.com"
            />
            <DisplayError
              errorsValidation={errorsValidation || []}
              keyProp="email"
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{Password}</Label>
            <div className="position-relative">
              <Input
                name="password"
                type={show ? "text" : "password"}
                defaultValue={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="test1"
              />
              <DisplayError
                errorsValidation={errorsValidation || []}
                keyProp="password"
              />
              <div className="show-hide" onClick={() => setShow(!show)}>
                <span className="show"> </span>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{ConfirmPassword}</Label>
            <div className="position-relative">
              <Input
                name="passwordConfirm"
                type={show ? "text" : "password"}
                defaultValue={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                placeholder="test1"
              />
              <DisplayError
                errorsValidation={errorsValidation || []}
                keyProp="passwordConfirm"
              />
              <div className="show-hide" onClick={() => setShow(!show)}>
                <span className="show"> </span>
              </div>
            </div>
          </FormGroup>
          <FormGroup className="form-group mb-0">
            <div className="text-end mt-3">
              <Button type="submit" color="primary" block disabled={isLoading}>
                {SignUp}
              </Button>
            </div>
          </FormGroup>
          <p className="mt-4 mb-0 text-center">
            {AlreadyHaveAnAccount}
            <Link className="ms-2" href={"login"}>
              {AuthSignIn}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
