import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import RichTextEditor2 from "@/Components/Editor/RichTextEditor2";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import SelectPageType from "./SelectPageType";
import { StaticPageValidationSchema } from "@/app/lib/definitions";
import { useState } from "react";
import {
  ErrorValidation,
  StaticPageSuccessResponse,
} from "@/Types/ApiResponseType";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import DisplayError from "@/utils/DisplayError";
import { PageTypeEnum, PublishStatusEnum } from "@/app/lib/enums";
import { LoadingButton } from "@/Components/Button/Loading";
import ShowValidationError from "@/Components/Toast/Error/ShowValidationError";
import ShowError from "@/Components/Toast/Error/ShowError";
import { editStaticPage } from "@/app/actions/staticPage/editStaticPage";
import { createNewStaticPage } from "@/app/actions/staticPage/createNewStaticPage";

interface FormPostProps {
  staticPageId: number;
  staticPageData: StaticPageSuccessResponse | undefined;
}

export const FormPost: React.FC<FormPostProps> = ({
  staticPageId,
  staticPageData,
}) => {
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation("common");

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<StaticPageValidationSchema>();

  const handleFormSubmit: SubmitHandler<StaticPageValidationSchema> = async (
    data
  ) => {
    console.log({ data });
    setIsLoading(true); // Set loading to true when form submission starts
    try {
      const response =
        staticPageId > 0
          ? await editStaticPage(staticPageId, data)
          : await createNewStaticPage(data);
      if ("errorType" in response) {
        ShowValidationError(response.errorsValidation!);
        ShowError(response.errorMessage);
      } else {
        ShowSuccess(response.message);
        staticPageId = response.data.id;
        handleReload(`/blog/${staticPageId}`);
      }
    } finally {
      setIsLoading(false);
    }
    return;
  };

  const handleReload = (path: string) => {
    window.location.reload(); // Reloads the current page
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Row>
        <Col sm="6">
          <FormGroup>
            {/* <SelectPageType
              onChange={(id) => {
                console.log({
                  id,
                  formValue: getValues("pageType"),
                });
                setValue("pageType", id as PageTypeEnum);
              }}
              pageType={getValues("pageType")}
            /> */}
            <DisplayError
              errorsValidation={errorsValidation}
              errorMessage={errors["pageType"]?.message}
              keyProp="pageType"
            />{" "}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label check>
              {t("Title")} <span className="txt-danger"> *</span>
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  type="text"
                  invalid={!!errors["title"]}
                />
              )}
            />
            <DisplayError
              errorsValidation={errorsValidation}
              errorMessage={errors["title"]?.message}
              keyProp="title"
            />{" "}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <div className="email-wrapper">
            <div className="theme-form">
              <FormGroup>
                <Label check>{t("Content")}</Label>{" "}
                <span className="txt-danger"> *</span>
                <DisplayError
                  errorsValidation={errorsValidation}
                  errorMessage={errors["body"]?.message}
                  keyProp="body"
                />{" "}
                <RichTextEditor2
                  initialValue={getValues("body") || ""}
                  onChange={(text) => {
                    console.log({
                      text,
                      formValue: getValues("body"),
                    });
                    setValue("body", text);
                  }}
                  uploadFolderPath="staticPage/uploadBodyImage"
                />
              </FormGroup>
            </div>
          </div>
        </Col>
      </Row>
      <div className="btn-showcase text-end mt-4">
        <Button type="submit" color="primary">
          {isLoading ? <LoadingButton /> : t("Submit")}
        </Button>
      </div>
    </Form>
  );
};
