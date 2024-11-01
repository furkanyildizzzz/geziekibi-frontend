"use client";
import { editTag } from "@/app/actions/tag/editTag";
import { getTagById } from "@/app/actions/tag/getTagById";
import { CreateTagFormSchema, CreateTagSchema } from "@/app/lib/definitions";
import ModalComponent from "@/CommonComponent/Modal";
import { Cancel, EditTagHeading, TagName, Edit } from "@/Constant/constant";
import useFormState from "@/hooks/useFormState";
import { ErrorValidation, TagSuccessResponse } from "@/Types/ApiResponseType";
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
  } = useForm<TagSuccessResponse>({
    resolver: zodResolver(CreateTagFormSchema),
  });

  const router = useRouter();

  const fetchTagData = async () => {
    const response = await getTagById(Number(id));
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
    const response = await editTag(Number(id), data);
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
