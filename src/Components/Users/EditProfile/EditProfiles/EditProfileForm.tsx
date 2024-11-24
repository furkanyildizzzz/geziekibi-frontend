import { Button, Card, CardBody, CardFooter, Col, Form } from "reactstrap";
import { EditProfile, UpdateProfile } from "@/Constant/constant";
import { EditProfileFormBody } from "./EditProfileFormBody";
import { CommonCardHeader } from "@/Components/General/Widgets/Common/CommonCardHeader";
import { ErrorValidation, UserSuccessResponse } from "@/Types/ApiResponseType";
import { useTranslation } from "react-i18next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserFormSchema, EditUserSchema } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { updateUserProfile } from "@/app/actions/user/updateUserProfile";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import DisplayError from "@/utils/DisplayError";
import { LoadingButton } from "@/Components/Button/Loading";

const EditProfileForm = ({ user }: { user: UserSuccessResponse }) => {
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation("common");

  const methods = useForm<EditUserSchema>({
    resolver: zodResolver(EditUserFormSchema),
  });

  const handleSubmit: SubmitHandler<EditUserSchema> = async (data) => {
    setIsLoading(true); // Set loading to true when form submission starts
    try {
      const response = await updateUserProfile(data);

      if ("errorType" in response) {
        setErrorsValidation(response.errorsValidation!);
        setErrorMessage(response.errorMessage);
      } else {
        ShowSuccess(response.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false); // Set loading to false when form submission ends
    }
    return;
  };

  useEffect(() => {
    if (user) {
      methods.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        secondEmail: user.address.secondEmail,
        website: user.address.website,
        address: user.address.address,
        city: user.address.city,
        zipCode: user.address.zipCode,
        country: user.address.country,
      }); // Reset the form with user data
    }
  }, [user]);

  return (
    <Col xl="8">
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card>
            <EditProfileFormBody />
            <CardBody>
              {" "}
              <DisplayError
                errorMessage={errorMessage}
                errorsValidation={errorsValidation}
              />
            </CardBody>
            <CardFooter className="text-end">
              <Button type="submit" color="primary">
                {isLoading ? <LoadingButton /> : t("Save")}
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </FormProvider>
    </Col>
  );
};

export default EditProfileForm;
