"use client";
import { responseContactForm } from "@/app/actions/contactForm/responseContactForm";
import { deleteContactForm } from "@/app/actions/contactForm/deleteContactForm";
import { getContactFormById } from "@/app/actions/contactForm/getContactFormById";
import { deleteTag } from "@/app/actions/tag/deleteTag";
import { editTag } from "@/app/actions/tag/editTag";
import { getTagById } from "@/app/actions/tag/getTagById";
import {
  CreateContactFormResponseFormSchema,
  CreateContactFormResponseSchema,
  CreateTagSchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import {
  ErrorValidation,
  ContactFormSuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Col, Form, FormGroup, Label } from "reactstrap";

const EditContactFormModal = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [contactFormData, setContactFormData] =
    useState<ContactFormSuccessResponse>();
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isLoading },
  } = useForm<ContactFormSuccessResponse>({
    resolver: zodResolver(CreateContactFormResponseFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      response: "",
    },
  });

  const router = useRouter();
  const { t } = useTranslation("common");

  const fetchContactFormData = async () => {
    const response = await getContactFormById(Number(id));
    if ("data" in response) {
      setContactFormData({ ...response.data });
      reset({ ...response.data });
    }
  };

  useEffect(() => {
    fetchContactFormData();
  }, []);

  const onsubmit = async (data: CreateContactFormResponseSchema) => {
    const response = await responseContactForm(Number(id), data);

    if ("errorType" in response) {
      setErrorsValidation(response.errorsValidation!);
      setErrorMessage(response.errorMessage);
    } else {
      ShowSuccess(response.message);
      router.back();
    }
    return;
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete:\r ${
          contactFormData!.fullName
        } message?`
      )
    ) {
      try {
        await deleteContactForm(contactFormData!.id);
        router.back();
      } catch (error) {
        setErrorMessage("Failed to delete contact form. Please try again.");
      }
    }
  };

  return (
    <ModalComponent title={t("Response") + ` "${getValues("fullName")}"`}>
      <Col xs="12">
        <DisplayError errorMessage={errorMessage} />
        <Form
          className="theme-form"
          onSubmit={handleSubmit((data) =>
            onsubmit(data as CreateContactFormResponseSchema)
          )}
        >
          <FormGroup>
            <input
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
            <Label for="fullName">{t("Full Name")}</Label>
            <input
              type="text"
              className="m-0 form-control"
              id="fullName"
              readOnly
              {...register("fullName")}
            />
          </FormGroup>

          <FormGroup>
            <Label for="email">{t("Email")}</Label>
            <input
              type="email"
              className="m-0 form-control"
              id="email"
              readOnly
              {...register("email")}
            />
          </FormGroup>

          <FormGroup>
            <Label for="phone">{t("Phone")}</Label>
            <input
              type="text"
              className="m-0 form-control"
              id="phone"
              readOnly
              {...register("phone")}
            />
          </FormGroup>

          <FormGroup>
            <Label for="message">{t("Message")}</Label>
            <textarea
              className="m-0 form-control"
              id="message"
              rows={4}
              readOnly
              {...register("message")}
            />
          </FormGroup>

          <FormGroup>
            <Label for="response" check>
              {t("Response")} <span className="txt-danger"> *</span>
            </Label>
            <textarea
              className="m-0 form-control"
              id="response"
              rows={4}
              {...register("response")}
            />
            <DisplayError
              errors={errors}
              errorsValidation={errorsValidation}
              keyProp="response"
            />
          </FormGroup>
          <ModalButtons isLoading={isLoading} deleteFunction={handleDelete} />
        </Form>
      </Col>
    </ModalComponent>
  );
};

export default EditContactFormModal;
