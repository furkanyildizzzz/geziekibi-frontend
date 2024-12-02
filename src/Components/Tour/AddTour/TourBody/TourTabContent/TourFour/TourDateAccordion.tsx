//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
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
import CommonAccordionItem from "./CommonAccordionItem";
import { StaticAccordion } from "./StaticAccordion";
import { SimpleAccordions } from "@/Constant/constant";
import { CommonCardHeader } from "@/Components/General/Widgets/Common/CommonCardHeader";
import TourPriceItem from "./TourPriceItem";
import {
  ErrorValidation,
  TourDateSuccessResponse,
  TourPriceSuccessResponse,
} from "@/Types/ApiResponseType";
import TourPriceList from "./TourPriceList";
import { ChevronDown } from "react-feather";
import DisplayError from "@/utils/DisplayError";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTourPriceFormSchema } from "@/app/lib/definitions";
import { CurrencyDisplayNames, CurrencyEnum } from "@/app/lib/enums";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";

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

interface TourDateAccordion {
  tourDate: TourDateSuccessResponse;
}

export const TourDateAccordion: React.FC<TourDateAccordion> = ({
  tourDate,
}) => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  const { t } = useTranslation("common");
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const { formValue, isLoading: isLoadingTour } = useAppSelector(
    (state) => state.addProduct
  );

  const [formList, setFormList] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "" },
  ]);

  const [priceList, setPriceList] = useState<TourPriceSuccessResponse[]>([]);

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

  useEffect(() => {
    console.log({ priceList });
  }, [priceList]);

  //   const setExistingPriceList = useCallback(async () => {
  //     setPriceList(formValue.prices);
  //   }, [formValue]);

  //   useEffect(() => {
  //     if (
  //       (formValue.id > 0 || formValue.copyTourId > 0) &&
  //       priceList.length === 0
  //     ) {
  //       setExistingPriceList();
  //     }
  //   }, [setExistingPriceList]);

  const onSubmit = (data: TourPriceSuccessResponse) => {
    //Aynı isimle gelen kaydi ekleme
    console.log({ formValue });
    if (
      priceList?.find(
        (s: TourPriceSuccessResponse) =>
          s.name === data.name &&
          s.currency === data.currency &&
          s.description === data.description
      )
    ) {
      setErrorMessage(`Price "${data.name}" already exits`);
      return;
    }

    const newPrice = {
      ...data,
      rowId:
        priceList?.length > 0 ? priceList[priceList.length - 1].rowId + 1 : 1,
    };
    console.log({ priceList });
    console.log({ newPrice });

    setPriceList((prev) => {
      if (prev) return [...prev, newPrice];
      return [newPrice];
    });

    reset();
  };

  const handleRemovePrice = (rowId: number) => {
    if (!isLoadingTour) {
      setPriceList((prev: TourPriceSuccessResponse[]) => [
        ...prev.filter((s) => s.rowId !== rowId),
      ]);
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
                targetId="1"
                className="bg-light-primary txt-primary"
              >
                <span className="txt-primary">
                  {new Date(tourDate.tourDate).toLocaleDateString("tr")}
                </span>
                <ChevronDown className="svg-color txt-primary" />
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Card className="sidebar-body">
                  <CardHeader className="b-bottom">
                    <div className="todo-list-header">
                      <DisplayError errorMessage={errorMessage} />
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
                            priceList={tourDate.prices}
                            handleRemovePrice={() => {}}
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
