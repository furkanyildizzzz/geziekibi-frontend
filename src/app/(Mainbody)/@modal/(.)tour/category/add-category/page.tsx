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
  Href,
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
import SVG from "@/Components/SVG/Svg";
import Link from "next/link";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";

const AddTourCategoryModal = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<ExtFile[]>([]);

  const [tourCategories, setTourCategories] = useState<
    TourCategorySuccessResponse[]
  >([]);

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isLoading, errors, isSubmitting },
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
    data.primaryImages = files;
    console.log({ data })
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
  const handleRemove = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
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
            <Row>
              <FormGroup>
                <Label for="image" check>
                  {t("Upload Image")}
                </Label>
                <div className="product-upload">
                  <Dropzone
                    onChange={(files: ExtFile[]) => setFiles(files)}
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
