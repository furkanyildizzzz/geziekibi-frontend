import { CommonCardHeader } from "@/Components/General/Widgets/Common/CommonCardHeader";
import Cookies from "js-cookie";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import CommonUserFormGroup from "../Common/CommonUserFormGroup";
import { UserFormHead } from "./UserFormHead";
import { useTranslation } from "react-i18next";
import { ErrorValidation, UserSuccessResponse } from "@/Types/ApiResponseType";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordFormSchema,
  ChangePasswordSchema,
  EditUserFormSchema,
} from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { LoadingButton } from "@/Components/Button/Loading";
import { changePassword } from "@/app/actions/user/changePassword";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import DisplayError from "@/utils/DisplayError";
import { useRouter } from "next/navigation";

const MyProfile = ({ user }: { user: UserSuccessResponse }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation("common");
  const router = useRouter();
  const methods = useForm<ChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordFormSchema),
  });

  const handleSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
    setIsLoading(true); // Set loading to true when form submission starts
    setErrorsValidation([]);
    try {
      const response = await changePassword(data);

      if ("errorType" in response) {
        setErrorsValidation(response.errorsValidation!);
      } else {
        ShowSuccess(response.message);
        Cookies.remove("token");
        setInterval(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false); // Set loading to false when form submission ends
    }
    return;
  };

  return (
    <Col xl="4">
      <Card>
        <CommonCardHeader title={t("My Profile")} headClass="pb-0" />
        <CardBody>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(handleSubmit)}>
              <UserFormHead user={user} />
              <FormGroup>
                <Label className="form-label">{t("Email Address")}</Label>
                <Input
                  id={"email"}
                  type={"email"}
                  placeholder={"your-email@domain.com"}
                  defaultValue={user?.email}
                  disabled={true}
                />
              </FormGroup>
              <div className="position-relative">
                <CommonUserFormGroup
                  type={show ? "text" : "password"}
                  title={t("New Password")}
                  placeholder="********"
                  name="newPassword"
                />
                <div className="show-hide" onClick={() => setShow(!show)}>
                  <span className="show"></span>
                </div>
              </div>{" "}
              <DisplayError
                keyProp="newPassword"
                errorsValidation={errorsValidation}
              />
              <CommonUserFormGroup
                type={show ? "text" : "password"}
                title={t("Confirm New Password")}
                placeholder="********"
                name="confirmNewPassword"
              />
              <CardBody>
                <DisplayError
                  keyProp="confirmNewPassword"
                  errorsValidation={errorsValidation}
                />
              </CardBody>
              <div className="form-footer">
                <Button type="submit" color="primary" className="d-block">
                  {isLoading ? <LoadingButton /> : t("Save")}
                </Button>
              </div>
            </Form>
          </FormProvider>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MyProfile;
