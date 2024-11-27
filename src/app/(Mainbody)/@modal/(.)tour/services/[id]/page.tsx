"use client";
import { editService } from "@/app/actions/tour/service/editService";
import { getServiceById } from "@/app/actions/tour/service/getServiceById";
import { editTag } from "@/app/actions/tag/editTag";
import { getTagById } from "@/app/actions/tag/getTagById";
import {
  CreateServiceFormSchema,
  CreateTagSchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
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
import { t } from "i18next";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import { useTranslation } from "react-i18next";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import { deleteService } from "@/app/actions/tour/service/deleteService";

const EditTagModal = ({ params: { id } }: { params: { id: string } }) => {
  const [serviceData, setServiceData] = useState<ServiceSuccessResponse>();
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const { t } = useTranslation("common");

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
      setServiceData({ ...response.data });
      reset({ ...response.data });
    }
  };

  useEffect(() => {
    fetchTagData();
  }, []);

  const onsubmit = async (data: CreateTagSchema) => {
    const response = await editService(Number(id), data);

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
      window.confirm(
        `Are you sure you want to delete:\r ${serviceData!.name} ?`
      )
    ) {
      try {
        await deleteService(serviceData!.id);
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
          <ModalButtons isLoading={isLoading} deleteFunction={handleDelete} />
        </Form>
      </Col>
    </ModalComponent>
  );
};

export default EditTagModal;
