/* eslint-disable @next/next/no-img-element */
import { getHomepageSliderById } from "@/app/actions/homepageSlider/getHomepageSliderById";
import ShowError from "@/Components/Toast/Error/ShowError";
import { HomepageSliderSuccessResponse } from "@/Types/ApiResponseType";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  Row,
} from "reactstrap";
import { GetCloudinaryPdfFileFirstPageAsImange } from "./FileListItem";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@/Components/Button/Loading";
import { useTranslation } from "react-i18next";
import {
  EditHomepageSliderFormSchema,
  EditHomepageSliderSchema,
} from "@/app/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateHomepageSlider } from "@/app/actions/homepageSlider/updateHomepageSlider";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import DisplayError from "@/utils/DisplayError";
import { deleteHomepageSlider } from "@/app/actions/homepageSlider/deleteHomepageSlider";

export interface HomepageSliderModalInterfaceType {
  value: boolean;
  setOpenModal: (value: boolean) => void;
  dataId: number;
  onFileUpload: () => void;
}

const HomepageSliderEditModal: React.FC<HomepageSliderModalInterfaceType> = ({
  value,
  setOpenModal,
  dataId,
  onFileUpload,
}) => {
  const [open, setOpen] = useState(value);
  const [homepageSlider, setHomepageSlider] =
    useState<HomepageSliderSuccessResponse>();

  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditHomepageSliderSchema>({
    resolver: zodResolver(EditHomepageSliderFormSchema),
    defaultValues: {
      order: 1,
      isActive: true,
    },
  });

  const onSubmitForm = async (data: EditHomepageSliderSchema) => {
    setIsLoading(true); // Set loading to true when form submission starts
    try {
      const response = await updateHomepageSlider(dataId, data);

      if ("errorType" in response) {
        ShowError(response.errorMessage!);
      } else {
        ShowSuccess(response.message);
        onCloseModal();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false); // Set loading to false when form submission ends
    }
    return;
  };

  const fetchHomepageSliderById = async () => {
    const response = await getHomepageSliderById(dataId);
    if ("errorType" in response) {
      ShowError(response.errorMessage);
      onCloseModal();
    } else {
      setHomepageSlider({ ...response.data });
    }
  };

  useEffect(() => {
    fetchHomepageSliderById();
  }, [dataId]);

  useEffect(() => {
    if (homepageSlider) {
      reset({
        order: homepageSlider.order,
        isActive: homepageSlider.isActive,
      });
    }
  }, [homepageSlider]);

  const onCloseModal = () => {
    setOpen(false);
    setOpenModal(false);
    onFileUpload();
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ?`)) {
      try {
        setIsLoading(true);

        await deleteHomepageSlider(homepageSlider!.id);
      } catch (error) {
        ShowError("Failed to delete homepageSlider. Please try again.");
      } finally {
        setIsLoading(false);
        window.location.reload();
      }
    }
  };

  return (
    <Modal
      centered
      size="lg"
      className="product-box"
      isOpen={open}
      toggle={onCloseModal}
    >
      <ModalHeader className="position-relative">
        <Button close onClick={onCloseModal}></Button>
        <Row className="product-box align-items-center">
          <Col lg="6" className="product-img">
            <img
              className="img-fluid"
              src={GetCloudinaryPdfFileFirstPageAsImange(
                homepageSlider?.image.url || ""
              )}
              alt="image"
            />
          </Col>
          <Col lg="6" className="product-details text-start p-1">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <FormGroup>
                <Col xs="12">
                  <Label className="m-0" check>
                    {t("Order")}
                  </Label>
                </Col>
                <Col xs="12">
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
                  <DisplayError errorMessage={errors["order"]?.message} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs="12">
                  <Label className="m-0" check>
                    {t("IsActive")}
                  </Label>
                </Col>
                <Col xs="12">
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

                  <DisplayError errorMessage={errors["isActive"]?.message} />
                </Col>
              </FormGroup>
              <Row>
                <Col lg="6">
                  <Button type="submit" color="primary">
                    {isLoading ? <LoadingButton /> : t("Save")}
                  </Button>
                </Col>
                <Col lg="6">
                  <Button type="button" color="danger" onClick={handleDelete}>
                    {isLoading ? <LoadingButton /> : t("Delete")}
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </ModalHeader>
    </Modal>
  );
};
export default HomepageSliderEditModal;
