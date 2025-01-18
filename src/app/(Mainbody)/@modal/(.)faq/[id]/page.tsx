"use client";
import { deleteTourCategory } from "@/app/actions/tour/category/deleteTourCategory";
import { editTourCategory } from "@/app/actions/tour/category/editTourCategory";
import { getTourCategoryById } from "@/app/actions/tour/category/getTourCategoryById";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import {
  CreateFAQFormSchema,
  CreateFAQSchema,
  CreateTourCategoryFormSchema,
  CreateTourCategorySchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import SVG from "@/Components/SVG/Svg";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import AlreadyUploadedDropzone from "@/Components/Dropzone/AlreadyUploadedDropzone";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import { Href } from "@/Constant/constant";

import {
  CloudinaryImage,
  ErrorValidation,
  FAQSuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { getFAQById } from "@/app/actions/faq/getFaqById";
import { editFAQ } from "@/app/actions/faq/editFaq";
import { deleteFAQ } from "@/app/actions/faq/deleteFaq";

const EditFAQModal = ({ params: { id } }: { params: { id: string } }) => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [faq, setFAQ] = useState<FAQSuccessResponse>();

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(CreateFAQFormSchema),
  });

  const fetchFAQData = async () => {
    const response = await getFAQById(Number(id));
    if ("data" in response) {
      setFAQ({ ...response.data });
      reset({
        id: response.data.id,
        Question: response.data.Question,
        Answer: response.data.Answer,
        Order: response.data.Order,
      });
    }
  };

  useEffect(() => {
    fetchFAQData();
  }, []);

  const onsubmit = async (data: CreateFAQSchema) => {
    console.log(data);
    const response = await editFAQ(Number(id), data);

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
      window.confirm(`Are you sure you want to delete:\r ${faq?.Question} ?`)
    ) {
      try {
        await deleteFAQ(faq!.id);
        router.back(); // Close modal by navigating back
      } catch (error) {
        setErrorMessage("Failed to delete category. Please try again.");
      }
    }
  };
  return (
    <ModalComponent title={t("Edit") + ` "${getValues("Question")}"`}>
      <Form
        className="theme-form"
        onSubmit={handleSubmit((data) => onsubmit(data as CreateFAQSchema))}
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
            <Label for="Question" check>
              {t("Question")} <span className="txt-danger"> *</span>
            </Label>
            <input
              disabled={isSubmitting}
              type="text"
              className="m-0 form-control"
              id="Question"
              required
              {...register("Question")}
            />
            <DisplayError
              errors={errors}
              errorsValidation={errorsValidation}
              keyProp="Question"
            />
          </FormGroup>

          <FormGroup>
            <Label for="Answer" check>
              {t("Answer")} <span className="txt-danger"> *</span>
            </Label>
            <textarea
              disabled={isSubmitting}
              className="m-0 form-control"
              id="Answer"
              required
              style={{ minHeight: "150px" }}
              {...register("Answer")}
            />
            <DisplayError
              errors={errors}
              errorsValidation={errorsValidation}
              keyProp="Answer"
            />
          </FormGroup>

          <FormGroup>
            <Label for="Order" check>
              {t("Order")} <span className="txt-danger"> *</span>
            </Label>
            <input
              disabled={isSubmitting}
              className="m-0 form-control"
              id="Order"
              required
              {...register("Order", { valueAsNumber: true })}
            />
            <DisplayError
              errors={errors}
              errorsValidation={errorsValidation}
              keyProp="Order"
            />
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

export default EditFAQModal;
