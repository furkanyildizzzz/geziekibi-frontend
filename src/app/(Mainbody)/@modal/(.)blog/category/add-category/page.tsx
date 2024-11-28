"use client";
import { createNewTourCategory } from "@/app/actions/tour/category/createNewTourCategory";
import { getBlogCategoryList } from "@/app/actions/blog/category/getBlogCategoryList";
import {
  CreateBlogCategoryFormSchema,
  CreateBlogCategorySchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/Components/Modal";
import { ModalButtons } from "@/Components/Modal/ModalButtons";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import {
  ErrorValidation,
  BlogCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { createNewBlogCategory } from "@/app/actions/blog/category/createNewBlogCategory";

const AddTourCategoryModal = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [blogCategories, setBlogCategories] = useState<
    BlogCategorySuccessResponse[]
  >([]);

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isLoading, errors },
  } = useForm({
    resolver: zodResolver(CreateBlogCategoryFormSchema),
    defaultValues: {
      name: "New Category",
      description: "",
      parentId: -1,
    },
  });

  const fetchBlogCategoryList = async () => {
    const response = await getBlogCategoryList();
    if ("data" in response) {
      console.log({ response });
      setBlogCategories([...response.data]);
    }
  };

  useEffect(() => {
    fetchBlogCategoryList();
  }, []);

  const handleParentIdChanged = (id: string) => {
    setValue("parentId", Number(id));
  };

  const onsubmit = async (data: CreateBlogCategorySchema) => {
    setErrorsValidation([]);
    setErrorMessage("");

    const response = await createNewBlogCategory(data);

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
    <ModalComponent title={t("CreateNewBlogCategoryHeading")}>
      <div className="page-body">
        <Col xs="12">
          <DisplayError errorMessage={errorMessage} />
          <Form
            className="theme-form"
            onSubmit={handleSubmit((data) =>
              onsubmit(data as CreateBlogCategorySchema)
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
                  options={blogCategories.map((item) => {
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
