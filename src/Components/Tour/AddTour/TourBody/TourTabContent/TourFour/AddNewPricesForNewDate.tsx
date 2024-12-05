import {
  CreateTourPriceFormSchema,
  TourDateSchema,
} from "@/app/lib/definitions";
import { useState } from "react";
import { ChevronDown } from "react-feather";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import TourPriceList from "./TourPriceList";
import {
  ErrorValidation,
  TourPriceSuccessResponse,
} from "@/Types/ApiResponseType";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrencyDisplayNames, CurrencyEnum } from "@/app/lib/enums";
import DisplayError from "@/utils/DisplayError";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import ShowError from "@/Components/Toast/Error/ShowError";
import { updateDatePriceList } from "@/Redux/Reducers/AddProductSlice";

export const DropDownData = [
  {
    id: CurrencyEnum.TRY,
    name: CurrencyDisplayNames[CurrencyEnum.TRY],
    header: true,
  },
  {
    id: CurrencyEnum.EUR,
    name: CurrencyDisplayNames[CurrencyEnum.EUR],
  },
  {
    id: CurrencyEnum.USD,
    name: CurrencyDisplayNames[CurrencyEnum.USD],
  },
];

interface AddNewPricesForNewDateProps {
  tourDate: TourDateSchema;
  accordionId: string;
  handleRemoveTourDate: (index: number) => void;
}

export const AddNewPricesForNewDate: React.FC<AddNewPricesForNewDateProps> = ({
  tourDate,
  accordionId,
  handleRemoveTourDate,
}) => {
  const [open, setOpen] = useState(accordionId);
  const toggle = (id: string) => (open === id ? setOpen("") : setOpen(id));

  const { t } = useTranslation("common");
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const { formValue, isLoading: isLoadingTour } = useAppSelector(
    (state) => state.addProduct
  );

  const [priceList, setPriceList] = useState<TourPriceSuccessResponse[]>(
    tourDate.prices as TourPriceSuccessResponse[]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    getValues,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(CreateTourPriceFormSchema),
    defaultValues: {
      id: 0,
      name: "New Price",
      price: 4500,
      currency: CurrencyEnum.TRY,
      description: "",
    },
  });

  const onSubmit = (data: TourPriceSuccessResponse) => {
    if (
      priceList?.find(
        (s: TourPriceSuccessResponse) =>
          s.name === data.name &&
          s.currency === data.currency &&
          s.description === data.description
      )
    ) {
      ShowError(`Price "${data.name}" already exits`);
      return;
    }

    const newPrice = {
      ...data,
      rowId:
        priceList?.length > 0 ? priceList[priceList.length - 1].rowId + 1 : 1,
    };

    const updatedPriceList = priceList.length
      ? [...priceList, newPrice]
      : [newPrice];

    console.log({
      targetDate: tourDate.startDate,
      priceList: updatedPriceList,
    });
    setPriceList(updatedPriceList);

    dispatch(
      updateDatePriceList({
        targetDate: tourDate.startDate,
        priceList: updatedPriceList,
      })
    );

    reset();
  };

  const handleRemovePrice = (index: number) => {
    if (!isLoadingTour) {
      const updatedPriceList = priceList.filter((_, i) => i !== index);

      setPriceList(updatedPriceList);
      dispatch(
        updateDatePriceList({
          targetDate: tourDate.startDate,
          priceList: updatedPriceList,
        })
      );
    }
    console.log({ formValue });
  };

  const handleCurrencyChanged = (id: string) => {
    setValue("currency", id as CurrencyEnum);
  };

  return (
    <Col sm="12" xl="12">
      <Card className="basic-accordion">
        <CardBody>
          <Accordion open={open} toggle={toggle} className="dark-accordion">
            <AccordionItem>
              <AccordionHeader
                targetId={accordionId}
                className="bg-light-primary txt-primary"
              >
                <span className="txt-primary">
                  {new Date(tourDate.startDate).toLocaleDateString("tr")}
                </span>
                <span>-</span>
                <span className="txt-primary">
                  {new Date(tourDate.endDate).toLocaleDateString("tr")}
                </span>
                <span
                  className="task-action-btn"
                  onClick={() => handleRemoveTourDate(Number(accordionId))}
                  aria-disabled={isLoading || isLoadingTour}
                >
                  <span
                    className="action-box large delete-btn"
                    title={t("DeletePrice")}
                  >
                    <i className="icon">
                      <i className="icon-trash"></i>
                    </i>
                  </span>
                </span>

                <ChevronDown className="svg-color txt-primary" />
              </AccordionHeader>
              <AccordionBody accordionId={accordionId}>
                <Card>
                  <CardHeader>
                    <div className="todo-list-header">
                      <Form
                        className="theme-form"
                        onSubmit={handleSubmit((data) => {
                          onSubmit(data as TourPriceSuccessResponse);
                        })}
                      >
                        <Row>
                          <Col xs="3">
                            <FormGroup>
                              <Label for="name" check>
                                {t("SellingPriceName")}{" "}
                                <span className="txt-danger"> *</span>
                              </Label>
                              <input
                                type="text"
                                className="m-0 form-control"
                                id="name"
                                required
                                disabled={isLoadingTour}
                                {...register("name")}
                              />
                              <DisplayError
                                errors={errors}
                                errorsValidation={errorsValidation}
                                keyProp="name"
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="2">
                            <FormGroup>
                              <Label for="price" check>
                                {t("SellingPrice")}{" "}
                                <span className="txt-danger"> *</span>
                              </Label>
                              <input
                                type="number"
                                className="m-0 form-control"
                                id="price"
                                disabled={isLoadingTour}
                                {...register("price")}
                              />
                              <DisplayError
                                errors={errors}
                                // errorsValidation={errorsValidation}
                                keyProp="price"
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="2">
                            <FormGroup>
                              <Label for="currency" check>
                                {t("SellingCurrency")}{" "}
                                <span className="txt-danger"> *</span>
                              </Label>
                              <DropDownComponent
                                id="id"
                                title={""}
                                isRequired={false}
                                labelKey="name"
                                multiple={false}
                                placeHolder=""
                                onChange={handleCurrencyChanged}
                                isDisabled={isLoadingTour}
                                options={DropDownData.map((item) => {
                                  return {
                                    name: item.name,
                                    id: item.id.toString(),
                                  };
                                })}
                                selectedOption={[
                                  {
                                    id: CurrencyEnum.TRY,
                                    name: CurrencyDisplayNames[
                                      CurrencyEnum.TRY
                                    ],
                                  },
                                ]}
                              />
                              <DisplayError
                                errors={errors}
                                errorsValidation={errorsValidation}
                                keyProp="currency"
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="3">
                            <FormGroup>
                              <Label for="description" check>
                                {t("Description")}
                              </Label>
                              <input
                                type="text"
                                className="m-0 form-control"
                                id="description"
                                disabled={isLoadingTour}
                                {...register("description")}
                              />
                              <DisplayError
                                errors={errors}
                                errorsValidation={errorsValidation}
                                keyProp="description"
                              />
                            </FormGroup>
                          </Col>
                          <Col
                            xs="1"
                            style={{ alignSelf: "center", cursor: "pointer" }}
                          >
                            <Button
                              color="primary"
                              type="submit"
                              disabled={isLoading || isLoadingTour}
                            >
                              {" "}
                              {t("Add")}
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="todo">
                      <div className="todo-list-wrapper custom-scrollbar">
                        <div className="todo-list-container">
                          <TourPriceList
                            priceList={priceList}
                            handleRemovePrice={handleRemovePrice}
                          />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </Col>
  );
};
