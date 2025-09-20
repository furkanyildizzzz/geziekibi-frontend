import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  Row,
} from "reactstrap";
import { Link, PlusSquare } from "react-feather";
import { AddUploadMediaProps } from "@/Types/FileManagerType";
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  EditHomepageSliderFormSchema,
  EditHomepageSliderSchema,
} from "@/app/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import DisplayError from "@/utils/DisplayError";
import { LoadingButton } from "@/Components/Button/Loading";
import ShowValidationError from "@/Components/Toast/Error/ShowValidationError";
import ShowError from "@/Components/Toast/Error/ShowError";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import { createNewHomepageSlider } from "@/app/actions/homepageSlider/createNewHomepageSlider";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import SVG from "@/Components/SVG/Svg";
import { Href } from "@/Constant/constant";

const AddUploadMedia: React.FC<
  AddUploadMediaProps & { lastOrderNumber: number }
> = ({ onFileUpload, lastOrderNumber }) => {
  const { t } = useTranslation("common");
  const { t: tForm } = useTranslation("form");
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [files, setFiles] = useState<ExtFile[]>([]);
  console.log({ lastOrderNumber });
  const [open, setOpen] = useState(true);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EditHomepageSliderSchema>({
    resolver: zodResolver(EditHomepageSliderFormSchema),
    defaultValues: {
      order: lastOrderNumber,
      isActive: true,
    },
  });

  const onCloseModal = () => {
    setOpenUploadModal(false);
    setOpen(false);
    onFileUpload();
  };
  const updateFiles = (files: ExtFile[]) => {
    setFiles(files);
    setValue("homepageSlider", files);
  };

  useEffect(() => {
    console.log("Received lastOrderNumber in AddUploadMedia:", lastOrderNumber);
    setValue("order", lastOrderNumber);
  }, [lastOrderNumber]);

  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  const handleFormSubmit: SubmitHandler<EditHomepageSliderSchema> = async (
    data
  ) => {
    console.log({ data });
    setIsLoading(true); // Set loading to true when form submission starts
    try {
      const response = await createNewHomepageSlider(data);
      if ("errorType" in response) {
        ShowValidationError(tForm, response.errorsValidation!);
        ShowError(tForm, response.errorMessage);
      } else {
        ShowSuccess(response.message);
      }
    } finally {
      setIsLoading(false);
    }
    return;
  };
  return (
    <div className="flex-grow-1 text-end">
      <Form className="d-inline-flex">
        <Button
          color="primary"
          className="plus-square"
          onClick={() => {
            setOpen(true);
            setOpenUploadModal(true);
          }}
        >
          <PlusSquare /> {t("Add New")}
        </Button>
      </Form>

      {openUploadModal && open && (
        <Modal
          centered
          size="lg"
          className="product-box"
          isOpen={open}
          toggle={onCloseModal}
        >
          <div
            className="product-upload"
            style={{ display: "flex", gap: "3%", justifyContent: "center" }}
          >
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Row>
                <Col sm="6">
                  <Dropzone
                    onChange={(files: ExtFile[]) => updateFiles(files)}
                    value={files}
                    maxFiles={1}
                    multiple={true}
                    header={false}
                    footer={false}
                    minHeight="80px"
                    name="homepageSlider"
                  >
                    {files.map((file: ExtFile) => (
                      <FileMosaic
                        key={file.id}
                        {...file}
                        imageUrl={URL.createObjectURL(file.file!)}
                        onDelete={removeFile}
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
                </Col>

                <Col sm="6">
                  <FormGroup>
                    <Label check>
                      {t("Order")} <span className="txt-danger"> *</span>
                    </Label>
                    <Controller
                      name="order"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="m-0 form-control"
                          id="order"
                          required
                          {...register("order", { valueAsNumber: true })}
                        />
                      )}
                    />
                    <DisplayError
                      errorMessage={errors["order"]?.message}
                      keyProp="title"
                    />{" "}
                  </FormGroup>

                  <FormGroup>
                    <Label check>
                      {t("IsActive")} <span className="txt-danger"> *</span>
                    </Label>
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field }) => {
                        const { value, onChange, onBlur, ref, ...rest } = field; // Destructure to exclude `value`
                        return (
                          <input
                            {...rest}
                            type="checkbox"
                            checked={!!value} // Ensure the value is boolean
                            onChange={(e) => onChange(e.target.checked)} // Pass the boolean `checked` value
                            onBlur={onBlur} // Retain onBlur handling
                            ref={ref} // Retain ref
                          />
                        );
                      }}
                    />
                    <DisplayError
                      errorMessage={errors["isActive"]?.message}
                      keyProp="title"
                    />{" "}
                  </FormGroup>
                </Col>
              </Row>

              <Row
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "2%",
                }}
              >
                <div className="col-1 btn-showcase text-end mt-4">
                  <Button type="submit" color="primary" disabled={isLoading}>
                    {isLoading ? <LoadingButton /> : t("Submit")}
                  </Button>
                </div>
              </Row>
            </Form>
          </div>
        </Modal>
        // <AddHomepageSliderDropzoneModal
        //   value={openUploadModal}
        //   setOpenModal={setOpenUploadModal}
        //   onFileUpload={onFileUpload}
        // />
      )}
    </div>
  );
};
export default AddUploadMedia;
