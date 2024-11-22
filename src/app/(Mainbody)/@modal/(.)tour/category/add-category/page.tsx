"use client";
import { createNewTourCategory } from "@/app/actions/tour/category/createNewTourCategory";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import {
  CreateTourCategoryFormSchema,
  CreateTourCategorySchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import {
  Cancel,
  Edit,
  CreateNewTourCategoryHeading,
  CategoryName,
  Description,
  Add,
} from "@/Constant/constant";
import {
  ErrorValidation,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const AddTourCategoryModal = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [tourCategories, setTourCategories] = useState<
    TourCategorySuccessResponse[]
  >([]);

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isLoading, errors },
  } = useForm({
    resolver: zodResolver(CreateTourCategoryFormSchema),
    defaultValues: {
      name: "New Category",
      description: "",
      parentId: -1,
    },
  });

  const fetchTourCategoryList = async () => {
    const response = await getTourCategoryList();
    if ("data" in response) {
      console.log({ response });
      setTourCategories([...response.data]);
    }
  };

  useEffect(() => {
    fetchTourCategoryList();
  }, []);

  const handleParentIdChanged = (id: string) => {
    setValue("parentId", Number(id));
  };

  const onsubmit = async (data: CreateTourCategorySchema) => {
    setErrorsValidation([]);
    setErrorMessage("");

    const response = await createNewTourCategory(data);

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
    <ModalComponent title={t("CreateNewTourCategoryHeading")}>
      <div className="page-body">
        <Col xs="12">
          <DisplayError errorMessage={errorMessage} />
          <Form
            className="theme-form"
            onSubmit={handleSubmit((data) =>
              onsubmit(data as CreateTourCategorySchema)
            )}
          >
            <Row>
              <FormGroup>
                <Label for="name" check>
                  {t("CategoryName")} <span className="txt-danger"> *</span>
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
            <Row>
              <FormGroup>
                <DropDownComponent
                  id="parentId"
                  title={t("SelectParentCategory")}
                  isRequired={false}
                  labelKey="name"
                  multiple={false}
                  placeHolder=""
                  onChange={handleParentIdChanged}
                  options={tourCategories.map((item) => {
                    return {
                      name: item.name,
                      id: item.id.toString(),
                    };
                  })}
                  selectedOption={undefined}
                />
                <DisplayError
                  errors={errors}
                  errorsValidation={errorsValidation}
                  keyProp="parentId"
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

export default AddTourCategoryModal;
