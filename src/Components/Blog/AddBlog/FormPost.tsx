import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  BlogPostText,
  PostCategory,
  PostContent,
  PostTitle,
  PostTitlePlaceholder,
  PostTypePlaceholder,
} from "@/Constant/constant";
import { PostTypeData } from "@/Data/Miscellaneous/Blog/BlogData";
import SimpleMdeReact from "react-simplemde-editor";
import { useTranslation } from "react-i18next";
import RichTextEditor2 from "@/Components/Editor/RichTextEditor2";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import DropzoneClass from "./BlogPrimaryImages";
import DropdownBlogCategory from "./DropdownBlogCategory";
import DropdownTagComponent from "@/Components/Dropdown/DropdownTagComponent";
import PublishDate from "./PublishDate";
import SelectPublishStatus from "./SelectPublishStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import AddBlogContainer from "./AddBlogContainer";
import {
  BlogValidationFormSchema,
  BlogValidationSchema,
} from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import {
  BlogSuccessResponse,
  CloudinaryImage,
  ErrorValidation,
  TagSuccessResponse,
} from "@/Types/ApiResponseType";
import { updateUserProfile } from "@/app/actions/user/updateUserProfile";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import DisplayError from "@/utils/DisplayError";
import { PublishStatusEnum } from "@/app/lib/enums";
import BlogPrimaryImages from "./BlogPrimaryImages";
import { LoadingButton } from "@/Components/Button/Loading";
import { editBlog } from "@/app/actions/blog/self/editBlog";
import { createNewBlog } from "@/app/actions/blog/self/createNewBlog";
import ShowValidationError from "@/Components/Toast/Error/ShowValidationError";
import ShowError from "@/Components/Toast/Error/ShowError";
import { deleteBlog } from "@/app/actions/blog/self/deleteBlog";
import { useRouter } from "next/navigation";

interface FormPostProps {
  blogId: number;
  blogData: BlogSuccessResponse | undefined;
}

export const FormPost: React.FC<FormPostProps> = ({ blogId, blogData }) => {
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [isDeleting, setIsDeleting] = useState(false); // Add loading state
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const { t } = useTranslation("common");
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<BlogValidationSchema>();

  const handleFormSubmit: SubmitHandler<BlogValidationSchema> = async (
    data
  ) => {
    console.log({ data });
    setIsLoading(true); // Set loading to true when form submission starts
    try {
      const response =
        blogId > 0 ? await editBlog(blogId, data) : await createNewBlog(data);
      if ("errorType" in response) {
        ShowValidationError(response.errorsValidation!);
        ShowError(response.errorMessage);
      } else {
        ShowSuccess(response.message);
        blogId = response.data.id;
        handleReload(`/blog/${blogId}`);
      }
    } finally {
      setIsLoading(false);
    }
    return;
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Are you sure you want to delete:\r ${blogData!.title} ?`)
    ) {
      try {
        setIsDeleting(true);

        await deleteBlog(blogData!.id);
      } catch (error) {
        ShowError("Failed to delete tour. Please try again.");
      } finally {
        setIsDeleting(false);
        router.replace("/blogs");
      }
    }
  };

  const handleReload = (path: string) => {
    // window.location.reload(); // Reloads the current page
    router.push(path);
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label check>
              {t("Title")} <span className="txt-danger"> *</span>
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  type="text"
                  invalid={!!errors["title"]}
                />
              )}
            />
            <DisplayError
              errorsValidation={errorsValidation}
              errorMessage={errors["title"]?.message}
              keyProp="title"
            />{" "}
          </FormGroup>

          <FormGroup>
            <Label className="m-0" check>
              {t("Spot")} <span className="txt-danger"> *</span>
            </Label>
            <Controller
              name="spot"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="textarea"
                  invalid={!!errors["spot"]}
                  style={{ height: "130px" }}
                />
              )}
            />
            <DisplayError
              errorsValidation={errorsValidation}
              errorMessage={errors["spot"]?.message}
              keyProp="spot"
            />{" "}
          </FormGroup>

          <FormGroup>
            <DropdownBlogCategory
              onChange={(selectedCategory) => {
                console.log({
                  selectedCategory,
                  formValue: getValues("category"),
                });
                setValue("category", selectedCategory);
              }}
              selectedOption={
                getValues("category") ? [getValues("category")] : []
              }
            />
            <DisplayError
              errorsValidation={errorsValidation}
              errorMessage={errors["category"]?.message}
              keyProp="parentid"
            />{" "}
          </FormGroup>

          <FormGroup>
            <DropdownTagComponent
              onChange={(selectedTags) => {
                setValue(
                  "tags",
                  selectedTags.map((s) => {
                    return s as TagSuccessResponse;
                  })
                );
              }}
              incomingTags={getValues("tags")}
            />
            <DisplayError
              errorsValidation={errorsValidation}
              errorMessage={errors["tags"]?.message}
              keyProp="tags"
            />{" "}
          </FormGroup>
          <Row>
            <Col xs="6">
              <FormGroup>
                <SelectPublishStatus
                  onChange={(id) => {
                    console.log({
                      id,
                      formValue: getValues("publishStatus"),
                    });
                    setValue("publishStatus", id as PublishStatusEnum);
                  }}
                  publishStatus={getValues("publishStatus")}
                />
                <DisplayError
                  errorsValidation={errorsValidation}
                  errorMessage={errors["publishStatus"]?.message}
                  keyProp="publishStatus"
                />{" "}
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <PublishDate
                  onChange={(date) => {
                    console.log({
                      date,
                      formValue: getValues("publishDate"),
                    });
                    setValue("publishDate", date);
                  }}
                  publisDate={getValues("publishDate")}
                />
                <DisplayError
                  errorsValidation={errorsValidation}
                  errorMessage={errors["publishDate"]?.message}
                  keyProp="publishDate"
                />{" "}
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="m-0" check>
              {t("Picture")} <span className="txt-danger"> *</span>
            </Label>
            <DisplayError
              errorsValidation={errorsValidation}
              errorMessage={errors["primaryImages"]?.message}
              keyProp="primaryImages"
            />{" "}
            <BlogPrimaryImages
              onUploadFiles={(files) => {
                console.log({
                  files,
                  formValue: getValues("primaryImages"),
                });
                setValue("primaryImages", files);
              }}
              onRemoveFile={(id) => {
                console.log({
                  id,
                  formValue: getValues("primaryImages"),
                });
                setValue(
                  "primaryImages",
                  getValues("primaryImages")?.filter((s) => s.id != id)
                );
              }}
              onExitingFileRemove={(publicId) =>
                setValue(
                  "uploadedPrimaryImages",
                  getValues("uploadedPrimaryImages")?.filter(
                    (s) => s.publicId != publicId
                  )
                )
              }
              uploadedPrmaryImages={getValues("uploadedPrimaryImages")}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <div className="email-wrapper">
            <div className="theme-form">
              <FormGroup>
                <Label check>{t("Content")}</Label>{" "}
                <span className="txt-danger"> *</span>
                <DisplayError
                  errorsValidation={errorsValidation}
                  errorMessage={errors["body"]?.message}
                  keyProp="body"
                />{" "}
                <RichTextEditor2
                  initialValue={getValues("body") || ""}
                  onChange={(text) => {
                    console.log({
                      text,
                      formValue: getValues("body"),
                    });
                    setValue("body", text);
                  }}
                  uploadFolderPath="/blog/uploadBodyImage"
                />
              </FormGroup>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ display: "flex", justifyContent: "flex-end", gap: "2%" }}>
        <div className="col-1 btn-showcase text-end mt-4">
          <Button
            type="submit"
            color="primary"
            disabled={isLoading || isDeleting}
          >
            {isLoading ? <LoadingButton /> : t("Submit")}
          </Button>
        </div>
        {blogData && blogData.id > 0 && (
          <div className="col-1 btn-showcase text-end mt-4">
            <Button
              type="button"
              color="danger"
              onClick={handleDelete}
              disabled={isLoading || isDeleting}
            >
              {isDeleting ? <LoadingButton /> : t("Delete")}
            </Button>
          </div>
        )}
      </Row>
    </Form>
  );
};
