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

const CreateNewTagModal = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

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
      if (response.errorType == "Validation")
        setErrorsValidation(response.errorsValidation!);
      else setErrorMessage(response.errorMessage);
    } else {
      router.back(); // Close modal by navigating back
    }
    return;
  };

  return (
    <ModalComponent title={CreateNewTagHeading}>
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
                  {TagName} <span className="txt-danger"> *</span>
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
            <Row style={{ justifyContent: "flex-end" }}>
              <Col xs="3">
                <Button
                  color="light"
                  onClick={() => {
                    router.back();
                  }}
                  disabled={isLoading}
                >
                  {" "}
                  {Cancel}
                </Button>
              </Col>
              <Col xs="3">
                <Button color="primary" type="submit" disabled={isLoading}>
                  {" "}
                  {Add}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </div>
    </ModalComponent>
  );
};

export default CreateNewTagModal;
