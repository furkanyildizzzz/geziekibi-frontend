"use client";
import {
  CreateTourPathFormSchema,
  CreateTourPathSchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";

import { ErrorValidation } from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Col, Form, FormGroup, Label, Row } from "reactstrap";
import { createNewTourPath } from "@/app/actions/tour/tourPath/createNewTourPath";

const AddTourPathModal = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isLoading, errors },
  } = useForm({
    resolver: zodResolver(CreateTourPathFormSchema),
    defaultValues: {
      name: "New Path",
    },
  });

  const onsubmit = async (data: CreateTourPathSchema) => {
    setErrorsValidation([]);
    setErrorMessage("");

    const response = await createNewTourPath(data);

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
    <ModalComponent title={t("CreateNewTourPathHeading")}>
      <div className="page-body">
        <Col xs="12">
          <DisplayError errorMessage={errorMessage} />
          <Form
            className="theme-form"
            onSubmit={handleSubmit((data) =>
              onsubmit(data as CreateTourPathSchema)
            )}
          >
            <Row>
              <FormGroup>
                <Label for="name" check>
                  {t("PathName")} <span className="txt-danger"> *</span>
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

export default AddTourPathModal;
