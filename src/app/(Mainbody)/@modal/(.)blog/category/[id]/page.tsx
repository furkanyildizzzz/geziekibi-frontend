"use client";
import { deleteTourCategory } from "@/app/actions/tour/category/deleteTourCategory";
import { editTourCategory } from "@/app/actions/tour/category/editTourCategory";
import { getTourCategoryById } from "@/app/actions/tour/category/getTourCategoryById";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import {
  CreateBlogCategoryFormSchema,
  CreateBlogCategorySchema,
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
  BlogCategorySuccessResponse,
  CloudinaryImage,
  ErrorValidation,
  TourCategorySuccessResponse,
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
import { getBlogCategoryById } from "@/app/actions/blog/category/getBlogCategoryById";
import { editBlogCategory } from "@/app/actions/blog/category/editBlogCategory";
import { deleteBlogCategory } from "@/app/actions/blog/category/deleteBlogCategory";
import { getBlogCategoryList } from "@/app/actions/blog/category/getBlogCategoryList";

const EditBlogCategoryModal = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [existingFiles, setExistingFiles] = useState<CloudinaryImage[]>([]);

  const [blogCategories, setBlogCategories] = useState<
    BlogCategorySuccessResponse[]
  >([]);

  const [blogCategory, setBlogCategory] =
    useState<BlogCategorySuccessResponse>();

  const router = useRouter();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(CreateBlogCategoryFormSchema),
  });

  const fetchBlogCategoryData = async () => {
    const response = await getBlogCategoryById(Number(id));
    if ("data" in response) {
      setBlogCategory({ ...response.data });
      reset({
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        parentId: response.data.parent?.id,
        uploadedPrimaryImages: response.data.uploadedPrimaryImages || [],
      });
      setExistingFiles(response.data.uploadedPrimaryImages);
    }
  };

  const fetchBlogCategoryList = async () => {
    const response = await getBlogCategoryList();
    if ("data" in response) {
      setBlogCategories([...response.data]);
    }
  };

  useEffect(() => {
    fetchBlogCategoryData();
    fetchBlogCategoryList();
  }, []);

  const handleParentIdChanged = (id: string) => {
    setValue("parentId", Number(id));
  };

  const onsubmit = async (data: CreateBlogCategorySchema) => {
    data.primaryImages = files;
    const response = await editBlogCategory(Number(id), data);

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
        `Are you sure you want to delete:\r ${blogCategory?.name} ?`
      )
    ) {
      try {
        await deleteBlogCategory(blogCategory!.id);
        router.back(); // Close modal by navigating back
      } catch (error) {
        setErrorMessage("Failed to delete category. Please try again.");
      }
    }
  };

  const handleRemove = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  return (
    <ModalComponent
      title={t("EditBlogCategoryHeading") + ` "${getValues("name")}"`}
    >
      <Form
        className="theme-form"
        onSubmit={handleSubmit((data) =>
          onsubmit(data as CreateBlogCategorySchema)
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
              {t("CategoryName")} <span className="txt-danger"> *</span>
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
          <FormGroup>
            <Label for="description" check>
              {t("Description")}
            </Label>
            <input
              disabled={isSubmitting}
              type="text"
              className="m-0 form-control"
              id="description"
              {...register("description")}
            />
            <DisplayError
              errors={errors}
              errorsValidation={errorsValidation}
              keyProp="description"
            />{" "}
          </FormGroup>

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
              selectedOption={
                blogCategory?.parent
                  ? [
                      {
                        name: blogCategory.parent.name,
                        id: blogCategory.parent.id,
                      },
                    ]
                  : undefined
              }
            />
            <DisplayError
              errorsValidation={errorsValidation}
              keyProp="parentId"
            />{" "}
          </FormGroup>

          <FormGroup>
            <Label for="image" check>
              {t("Upload Image")}
            </Label>
            <div className="product-upload">
              {existingFiles.length > 0 && (
                <AlreadyUploadedDropzone
                  key={existingFiles[0].publicId}
                  images={existingFiles}
                  onRemove={(publicId: string) => {
                    const fileteredFiles = existingFiles.filter(
                      (s) => s.publicId !== publicId
                    );
                    setValue("uploadedPrimaryImages", [...fileteredFiles]);
                    setExistingFiles((prev) => [...fileteredFiles]);
                  }}
                  onReorder={(orderedFiles) => {
                    setExistingFiles(orderedFiles);
                  }}
                />
              )}
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

export default EditBlogCategoryModal;
