"use client";
import { createNewTourCategory } from "@/app/actions/tour/category/createNewTourCategory";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import {
  CreateFAQFormSchema,
  CreateFAQSchema,
  CreateTourCategoryFormSchema,
  CreateTourCategorySchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import {
  ErrorValidation,
  FAQSuccessResponse,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Col, Form, FormGroup, Label, Row } from "reactstrap";
import { getFAQList } from "@/app/actions/faq/getFaqList";
import { createNewFAQ } from "@/app/actions/faq/createNewFaq";

const AddFAQModal = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [tourCategories, setFAQs] = useState<FAQSuccessResponse[]>([]);

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isLoading, errors },
  } = useForm({
    resolver: zodResolver(CreateFAQFormSchema),
    defaultValues: {
      Question: "Soru",
      Answer: "Cevap",
      Order: 1,
    },
  });

  const onsubmit = async (data: CreateFAQSchema) => {
    setErrorsValidation([]);
    setErrorMessage("");

    const response = await createNewFAQ(data);

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
    <ModalComponent title={t("CreateNew")}>
      <div className="page-body">
        <Col xs="12">
          <DisplayError errorMessage={errorMessage} />
          <Form
            className="theme-form"
            onSubmit={handleSubmit((data) => onsubmit(data as CreateFAQSchema))}
          >
            <Row>
              <FormGroup>
                <Label for="Question" check>
                  {t("Question")} <span className="txt-danger"> *</span>
                </Label>
                <input
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
            </Row>

            <Row>
              <FormGroup>
                <Label for="Answer" check>
                  {t("Answer")} <span className="txt-danger"> *</span>
                </Label>
                <input
                  type="text"
                  className="m-0 form-control"
                  id="Answer"
                  required
                  {...register("Answer")}
                />
                <DisplayError
                  errors={errors}
                  errorsValidation={errorsValidation}
                  keyProp="Answer"
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Label for="Order" check>
                  {t("Order")} <span className="txt-danger"> *</span>
                </Label>
                <input
                  type="text"
                  className="m-0 form-control"
                  id="Order"
                  required
                  {...register("Order")}
                />
                <DisplayError
                  errors={errors}
                  errorsValidation={errorsValidation}
                  keyProp="Order"
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

export default AddFAQModal;
