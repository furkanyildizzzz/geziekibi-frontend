"use client";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import {
  Add,
  Cancel,
  TagName,
  CreateNewTagHeading,
  ServiceName,
  Description,
} from "@/Constant/constant";
import DisplayError from "@/utils/DisplayError";
import { createNewTag } from "@/app/actions/tag/createNewTag";
import useFormState from "@/hooks/useFormState";
import { useRouter } from "next/navigation";
import ModalComponent from "@/Components/Modal";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateServiceFormSchema,
  CreateServiceSchema,
} from "@/app/lib/definitions";
import { ErrorValidation } from "@/Types/ApiResponseType";
import { createNewService } from "@/app/actions/tour/service/createNewService";
import { useTranslation } from "react-i18next";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";

const CreateNewServiceModal = () => {
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
    resolver: zodResolver(CreateServiceFormSchema),
    defaultValues: {
      name: "New Service",
      description: "",
    },
  });

  const onsubmit = async (data: CreateServiceSchema) => {
    const response = await createNewService(data);

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
    <ModalComponent title={t("CreateNewServiceHeading")}>
      <div className="page-body">
        <Col xs="12">
          <DisplayError errorMessage={errorMessage} />
          <Form
            className="theme-form"
            onSubmit={handleSubmit((data) =>
              onsubmit(data as CreateServiceSchema)
            )}
          >
            <Row>
              <FormGroup>
                <Label for="name" check>
                  {t("ServiceName")} <span className="txt-danger"> *</span>
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
            <Row>
              <FormGroup>
                <Label for="description" check>
                  {t("Description")}
                </Label>
                <input
                  type="text"
                  className="m-0 form-control"
                  id="description"
                  {...register("description")}
                />
                <DisplayError
                  errors={errors}
                  errorsValidation={errorsValidation}
                  keyProp="description"
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

export default CreateNewServiceModal;
