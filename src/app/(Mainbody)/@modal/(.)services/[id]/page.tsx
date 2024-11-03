"use client";
import { editService } from "@/app/actions/tour/service/editService";
import { getServiceById } from "@/app/actions/tour/service/getServiceById";
import { editTag } from "@/app/actions/tag/editTag";
import { getTagById } from "@/app/actions/tag/getTagById";
import {
  CreateServiceFormSchema,
  CreateTagSchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/CommonComponent/Modal";
import {
  Cancel,
  EditTagHeading,
  TagName,
  Edit,
  Description,
  ServiceName,
} from "@/Constant/constant";
import useFormState from "@/hooks/useFormState";
import {
  ErrorValidation,
  ServiceSuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const EditTagModal = ({ params: { id } }: { params: { id: string } }) => {
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
  } = useForm<ServiceSuccessResponse>({
    resolver: zodResolver(CreateServiceFormSchema),
  });

  const router = useRouter();

  const fetchTagData = async () => {
    const response = await getServiceById(Number(id));
    if ("data" in response) {
      console.log({ data: response.data });
      reset({ ...response.data });
    }
  };

  useEffect(() => {
    fetchTagData();
  }, []);

  const onsubmit = async (data: CreateTagSchema) => {
    console.log({ data });
    const response = await editService(Number(id), data);
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
    <ModalComponent title={EditTagHeading + ` "${getValues("name")}"`}>
      <Col xs="12">
        <DisplayError errorMessage={errorMessage} />
        <Form
          className="theme-form"
          onSubmit={handleSubmit((data) => onsubmit(data as CreateTagSchema))}
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
            <Label for="name" check>
              {ServiceName} <span className="txt-danger"> *</span>
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
          <FormGroup>
            <Label for="description" check>
              {Description}
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
          <Button color="primary" type="submit" disabled={isLoading}>
            {" "}
            {Edit}
          </Button>
        </Form>
      </Col>
    </ModalComponent>
  );
};

export default EditTagModal;
