"use client";
import { deleteTag } from "@/app/actions/tag/deleteTag";
import { editTag } from "@/app/actions/tag/editTag";
import { getTagById } from "@/app/actions/tag/getTagById";
import { CreateTagFormSchema, CreateTagSchema } from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import { Cancel, EditTagHeading, TagName, Edit } from "@/Constant/constant";
import useFormState from "@/hooks/useFormState";
import { ErrorValidation, TagSuccessResponse } from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const EditTagModal = ({ params: { id } }: { params: { id: string } }) => {
  const [tagData, setTagData] = useState<TagSuccessResponse>();
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
  const { t } = useTranslation("common");

  const fetchTagData = async () => {
    const response = await getTagById(Number(id));
    if ("data" in response) {
      console.log({ data: response.data });
      setTagData({ ...response.data });
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
      setErrorsValidation(response.errorsValidation!);
      setErrorMessage(response.errorMessage);
    } else {
      ShowSuccess(response.message);
      router.back(); // Close modal by navigating back
    }
    return;
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Are you sure you want to delete:\r ${tagData!.name} ?`)
    ) {
      try {
        await deleteTag(tagData!.id);
        router.back(); // Close modal by navigating back
      } catch (error) {
        setErrorMessage("Failed to delete tag. Please try again.");
      }
    }
  };

  return (
    <ModalComponent title={t("Edit") + ` "${getValues("name")}"`}>
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
          <ModalButtons isLoading={isLoading} deleteFunction={handleDelete} />
        </Form>
      </Col>
    </ModalComponent>
  );
};

export default EditTagModal;
