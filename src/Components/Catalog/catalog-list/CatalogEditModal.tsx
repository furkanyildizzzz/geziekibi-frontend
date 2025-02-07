/* eslint-disable @next/next/no-img-element */
import { getCatalogById } from "@/app/actions/catalog/getCatalaogById";
import ShowError from "@/Components/Toast/Error/ShowError";
import { Catalog } from "@/Types/ApiResponseType";
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
import {
  Controller,
  FieldValues,
  Form,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { LoadingButton } from "@/Components/Button/Loading";
import { useTranslation } from "react-i18next";
import {
  EditCatalogFormSchema,
  EditCatalogSchema,
} from "@/app/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCatalog } from "@/app/actions/catalog/updateCatalog";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import DisplayError from "@/utils/DisplayError";
import PublishDate from "@/Components/Common/PublishDate";
import { PublishStatusEnum } from "@/app/lib/enums";
import SelectPublishStatus from "@/Components/Common/SelectPublishStatus";
import { deleteCatalog } from "@/app/actions/catalog/deleteCatalog";

export interface CatalogModalInterfaceType {
  value: boolean;
  setOpenModal: (value: boolean) => void;
  dataId: number;
}

const CatalogEditModal: React.FC<CatalogModalInterfaceType> = ({
  value,
  setOpenModal,
  dataId,
}) => {
  const [open, setOpen] = useState(value);
  const [catalog, setCatalog] = useState<Catalog>();

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
  } = useForm<EditCatalogSchema>({
    resolver: zodResolver(EditCatalogFormSchema),
    defaultValues: {
      originalName: "",
      publishDate: new Date(),
      publishStatus: PublishStatusEnum.PUBLISH,
    },
  });

  const onSubmitForm = async (data: EditCatalogSchema) => {
    setIsLoading(true); // Set loading to true when form submission starts
    try {
      const response = await updateCatalog(dataId, data);

      if ("errorType" in response) {
        ShowError(response.errorMessage!);
      } else {
        ShowSuccess(response.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false); // Set loading to false when form submission ends
    }
    return;
  };

  const fetchCatalogById = async () => {
    const response = await getCatalogById(dataId);
    if ("errorType" in response) {
      ShowError(response.errorMessage);
      onCloseModal();
    } else {
      setCatalog({ ...response.data });
    }
  };

  useEffect(() => {
    fetchCatalogById();
  }, [dataId]);

  useEffect(() => {
    if (catalog) {
      reset({
        originalName: catalog.originalName,
        publishDate: catalog.publishDate,
        publishStatus: catalog.publishStatus,
      });
    }
  }, [catalog]);

  const onCloseModal = () => {
    setOpen(false);
    setOpenModal(false);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete:\r ${catalog?.originalName} ?`
      )
    ) {
      try {
        setIsLoading(true);

        await deleteCatalog(catalog!.id);
      } catch (error) {
        ShowError("Failed to delete catalog. Please try again.");
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
              src={GetCloudinaryPdfFileFirstPageAsImange(catalog?.url || "")}
              alt="image"
            />
          </Col>
          <Col lg="6" className="product-details text-start p-1">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <FormGroup>
                <Col xs="12">
                  <Label className="m-0" check>
                    {t("Original Name")}
                  </Label>
                </Col>
                <Col xs="12">
                  <Controller
                    name="originalName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        required
                        type="text"
                        invalid={!!errors["originalName"]}
                      />
                    )}
                  />
                  <DisplayError
                    errorMessage={errors["originalName"]?.message}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Controller
                  key={catalog?.id}
                  name="publishDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <PublishDate
                        onChange={(date) => {
                          console.log({
                            date,
                            formValue: getValues("publishDate"),
                          });
                          field.onChange(date);
                        }}
                        publishDate={catalog?.publishDate || new Date()}
                      />
                    );
                  }}
                />
                <DisplayError
                  errorMessage={errors["publishDate"]?.message}
                  keyProp="publishDate"
                />{" "}
              </FormGroup>
              <FormGroup>
                <Controller
                  key={catalog?.id}
                  name="publishStatus"
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectPublishStatus
                        onChange={(id) => {
                          console.log({
                            id,
                            formValue: getValues("publishStatus"),
                          });
                          setValue("publishStatus", id as PublishStatusEnum);
                          field.onChange(id);
                        }}
                        publishStatus={
                          catalog?.publishStatus || PublishStatusEnum.DRAFT
                        }
                      />
                    );
                  }}
                />
                <DisplayError
                  errorMessage={errors["publishStatus"]?.message}
                  keyProp="publishStatus"
                />{" "}
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
export default CatalogEditModal;
