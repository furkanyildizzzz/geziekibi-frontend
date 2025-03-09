"use client";
import { editTourCategory } from "@/app/actions/tour/category/editTourCategory";
import {
  CreateTourPathFormSchema,
  CreateTourPathSchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";

import {
  ErrorValidation,
  TourPathSuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Col, Form, FormGroup, Label } from "reactstrap";
import { getTourPathById } from "@/app/actions/tour/tourPath/getTourCategoryById";
import { deleteTourPath } from "@/app/actions/tour/tourPath/deleteTourPath";
import { editTourPath } from "@/app/actions/tour/tourPath/editTourPath";

const EditTourPathModal = ({ params: { id } }: { params: { id: string } }) => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [tourCategory, setTourPath] = useState<TourPathSuccessResponse>();

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(CreateTourPathFormSchema),
  });

  const fetchTourPathData = async () => {
    const response = await getTourPathById(Number(id));
    if ("data" in response) {
      setTourPath({ ...response.data });
      reset({
        id: response.data.id,
        name: response.data.name,
      });
    }
  };

  useEffect(() => {
    fetchTourPathData();
  }, []);

  const onsubmit = async (data: CreateTourPathSchema) => {
    const response = await editTourPath(Number(id), data);

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
        `Are you sure you want to delete:\r ${tourCategory?.name} ?`
      )
    ) {
      try {
        await deleteTourPath(tourCategory!.id);
        router.back(); // Close modal by navigating back
      } catch (error) {
        setErrorMessage("Failed to delete path. Please try again.");
      }
    }
  };

  return (
    <ModalComponent
      title={t("EditTourPathHeading") + ` "${getValues("name")}"`}
    >
      <Form
        className="theme-form"
        onSubmit={handleSubmit((data) =>
          onsubmit(data as CreateTourPathSchema)
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
            <Label for="name" check>
              {t("Path")} <span className="txt-danger"> *</span>
            </Label>
            <input
              disabled={isSubmitting}
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
            <DisplayError errorsValidation={errorsValidation} keyProp="name" />{" "}
          </FormGroup>
        </Col>
        <Col xs="12">
          <ModalButtons
            isLoading={isSubmitting}
            deleteFunction={handleDelete}
          />
        </Col>
      </Form>
    </ModalComponent>
  );
};

export default EditTourPathModal;
