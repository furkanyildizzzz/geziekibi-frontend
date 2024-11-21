"use client";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { Add, Cancel, TagName, CreateNewTagHeading } from "@/Constant/constant";
import DisplayError from "@/utils/DisplayError";
import { createNewTag } from "@/app/actions/tag/createNewTag";
import useFormState from "@/hooks/useFormState";
import { useRouter } from "next/navigation";
import ModalComponent from "@/CommonComponent/Modal";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTagFormSchema, CreateTagSchema } from "@/app/lib/definitions";
import { ErrorValidation } from "@/Types/ApiResponseType";
import ShowSuccess from "@/CommonComponent/Toast/Success/ShowSuccess";
import { useTranslation } from "react-i18next";
import { ModalButtons } from "@/CommonComponent/Modal/ModalButtons";

const CreateNewTagModal = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(CreateTagFormSchema),
    defaultValues: {
      name: "New Tag",
    },
  });

  const onsubmit = async (data: CreateTagSchema) => {
    console.log({ data });
    const response = await createNewTag(data);
    console.log({ response });

    if ("errorType" in response) {
      setErrorsValidation(response.errorsValidation!);
      setErrorMessage(response.errorMessage);
    } else {
      ShowSuccess(response.message);
      router.back(); // Close modal by navigating back
    }
    return;
  };

  return (
    <ModalComponent title={t("CreateNewTagHeading")}>
      <div className="page-body">
        <Col xs="12">
          <DisplayError errorMessage={errorMessage} />
          <Form
            className="theme-form"
            onSubmit={handleSubmit((data) => onsubmit(data as CreateTagSchema))}
          >
            <Row>
              <FormGroup>
                <Label for="name" check>
                  {t("TagName")} <span className="txt-danger"> *</span>
                </Label>
                <input
                  type="text"
                  className="m-0 form-control"
                  id="name"
                  required
                  {...register("name")}
                />
                <DisplayError
                  errors={errors}
                  errorsValidation={errorsValidation}
                  keyProp="name"
                />
              </FormGroup>
            </Row>
            <ModalButtons isLoading={isLoading} />
          </Form>
        </Col>
      </div>
    </ModalComponent>
  );
};

export default CreateNewTagModal;
