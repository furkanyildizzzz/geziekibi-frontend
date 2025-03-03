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
import Link from "next/link";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { createNewBlogCategory } from "@/app/actions/blog/category/createNewBlogCategory";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import SVG from "@/Components/SVG/Svg";
import { Href } from "@/Constant/constant";

const AddTourCategoryModal = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<ExtFile[]>([]);

  const [blogCategories, setBlogCategories] = useState<
    BlogCategorySuccessResponse[]
  >([]);

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isLoading, errors, isSubmitting },
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

    data.primaryImages = files;
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
  const handleRemove = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
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

              <FormGroup>
                <Label for="image" check>
                  {t("Upload Image")}
                </Label>
                <div className="product-upload">
                  <Dropzone
                    onChange={(files) => setFiles(files)}
                    value={files}
                    maxFiles={1}
                    multiple={true}
                    header={false}
                    footer={false}
                    minHeight="80px"
                    name="primaryImages"
                    disabled={isSubmitting}
                  >
                    {files.map((file: ExtFile) => (
                      <FileMosaic
                        key={file.id}
                        {...file}
                        imageUrl={URL.createObjectURL(file.file!)}
                        onDelete={handleRemove}
                        info={true}
                      />
                    ))}
                    {files.length === 0 && (
                      <Form className="dropzone dropzone-light dz-clickable py-5">
                        <div className="dz-message needsclick">
                          <SVG iconId="file-upload" />
                          <h6>
                            {t("DragYourImageHere")}
                            <Link className="txt-primary" href={Href}>
                              &nbsp;{t("browser")}
                            </Link>
                          </h6>
                          <span className="note needsclick">
                            SVG,PNG,JPG {t("or")} GIF
                          </span>
                        </div>
                      </Form>
                    )}
                  </Dropzone>
                </div>
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
