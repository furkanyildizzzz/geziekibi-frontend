"use client";
import { deleteTourCategory } from "@/app/actions/tour/category/deleteTourCategory";
import { editTourCategory } from "@/app/actions/tour/category/editTourCategory";
import { getTourCategoryById } from "@/app/actions/tour/category/getTourCategoryById";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import {
  CreateBlogCategoryFormSchema,
  CreateBlogCategorySchema,
  CreateTourCategorySchema,
  EmailTemplateValidationFormSchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import SVG from "@/Components/SVG/Svg";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import AlreadyUploadedDropzone from "@/Components/Dropzone/AlreadyUploadedDropzone";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import { Href } from "@/Constant/constant";

import {
  BlogCategorySuccessResponse,
  CloudinaryImage,
  EmailTemplateSuccessResponse,
  ErrorValidation,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { getBlogCategoryById } from "@/app/actions/blog/category/getBlogCategoryById";
import { editBlogCategory } from "@/app/actions/blog/category/editBlogCategory";
import { deleteBlogCategory } from "@/app/actions/blog/category/deleteBlogCategory";
import { getEmailTemplateByType } from "@/app/actions/emailTemplate/getEmailTemplateByType";
import { EmailTemplateEnum } from "@/app/lib/enums";
import { editEmailTemplate } from "@/app/actions/emailTemplate/editEmailTemplate";
import RichTextEditor2 from "@/Components/Editor/RichTextEditor2";

const EditBlogCategoryModal = ({
  params: { templateKey },
}: {
  params: { templateKey: string };
}) => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [emailTemplate, setEmailTemplate] =
    useState<EmailTemplateSuccessResponse>();

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(EmailTemplateValidationFormSchema),
  });

  const fetchEmailTemplateData = async () => {
    const response = await getEmailTemplateByType(
      templateKey as EmailTemplateEnum
    );
    if ("data" in response) {
      setEmailTemplate({ ...response.data });
      reset({
        id: response.data.id,
        subject: response.data.subject,
        body: response.data.body,
        key: response.data.key,
      });
    }
  };

  useEffect(() => {
    fetchEmailTemplateData();
  }, []);

  // useEffect(() => {
  //   if (emailTemplate) {
  //     setValue("body", emailTemplate.body);
  //   }
  // }, [emailTemplate, setValue]);

  const onsubmit = async (data: CreateTourCategorySchema) => {
    const response = await editEmailTemplate(
      templateKey as EmailTemplateEnum,
      data
    );

    if ("errorType" in response) {
      setErrorsValidation(response.errorsValidation!);
      setErrorMessage(response.errorMessage);
    } else {
      ShowSuccess(response.message);
      router.back(); // Close modal by navigating back
    }
    return;
  };
  // if (!emailTemplate) {
  //   return <p>Loading...</p>; // veya bir yükleniyor animasyonu
  // }
  return (
    <ModalComponent
      size="xl"
      title={t("EditBlogCategoryHeading") + ` "${templateKey}"`}
    >
      <Form
        className="theme-form"
        onSubmit={handleSubmit((data) =>
          onsubmit(data as CreateBlogCategorySchema)
        )}
      >
        <Col xs="12">
          <DisplayError errorMessage={errorMessage} />
          <FormGroup>
            <input
              disabled={isSubmitting}
              className="m-0 form-control"
              id="id"
              hidden
              required
              {...register("id")}
            />
            <DisplayError
              errors={errors}
              errorsValidation={errorsValidation}
              keyProp="id"
            />{" "}
          </FormGroup>
          <FormGroup>
            <Label for="subject" check>
              {t("Subject")} <span className="txt-danger"> *</span>
            </Label>
            <input
              disabled={isSubmitting}
              type="text"
              className="m-0 form-control"
              id="subject"
              required
              {...register("subject")}
            />
            <DisplayError
              errors={errors}
              errorsValidation={errorsValidation}
              keyProp="subject"
            />
            <DisplayError
              errorsValidation={errorsValidation}
              keyProp="subject"
            />{" "}
          </FormGroup>
          <div className="theme-form">
            <FormGroup>
              <Label check>{t("Body")}</Label>{" "}
              <span className="txt-danger"> *</span>
              <DisplayError
                errorsValidation={errorsValidation}
                errors={errors}
                keyProp="body"
              />{" "}
              <RichTextEditor2
                key={emailTemplate?.id}
                initialValue={emailTemplate?.body || ""}
                onChange={(text) => {
                  setValue("body", text);
                }}
                uploadFolderPath="email/uploadBodyImage"
              />
            </FormGroup>
          </div>
        </Col>
        <Col xs="12">
          <ModalButtons isLoading={isSubmitting} />
        </Col>
      </Form>
    </ModalComponent>
  );
};

export default EditBlogCategoryModal;
