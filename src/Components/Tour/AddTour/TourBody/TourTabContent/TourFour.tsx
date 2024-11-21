import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import {
  Add,
  AddTask,
  Cancel,
  ChooseYourCurrency,
  Description,
  SellingCurrency,
  SellingPrice,
  SellingPriceName,
} from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTourPriceFormSchema,
  CreateTourPriceSchema,
} from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";
import {
  ErrorValidation,
  TourPriceSuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { createNewTourPrice } from "@/app/actions/tour/price/createNewTourPrice";
import { current } from "@reduxjs/toolkit";
import { CurrencyDisplayNames, CurrencyEnum } from "@/app/lib/enums";
import AddTourPriceForm from "./AddTourPriceForm";
import { number } from "zod";
import TourPriceList from "./TourPriceList";
import { useTranslation } from "react-i18next";

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

const TourFour = () => {
  const { t } = useTranslation("common");
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
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

  const setExistingPriceList = useCallback(async () => {
    setPriceList(formValue.prices);
  }, [formValue]);

  useEffect(() => {
    if (
      (formValue.id > 0 || formValue.copyTourId > 0) &&
      priceList.length === 0
    ) {
      setExistingPriceList();
    }
  }, [setExistingPriceList]);

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

    if (formValue.prices?.length) {
      dispatch(
        setFormValue({ name: "prices", value: [...formValue.prices, newPrice] })
      );
    } else {
      dispatch(setFormValue({ name: "prices", value: [newPrice] }));
    }

    reset();
  };

  const handleRemovePrice = (rowId: number) => {
    if (!isLoadingTour) {
      dispatch(
        setFormValue({
          name: "prices",
          value: formValue.prices?.filter(
            (s: TourPriceSuccessResponse) => s.rowId !== rowId
          ),
        })
      );
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
                    {t("SellingPrice")} <span className="txt-danger"> *</span>
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
                        name: CurrencyDisplayNames[CurrencyEnum.TRY],
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
              <Col xs="1" style={{ alignSelf: "center", cursor: "pointer" }}>
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
            {/* {!isSubmitted && (
        <Row style={{ justifyContent: "flex-end" }}>
          <Col xs="3">
            <Button color="primary" type="submit" disabled={isLoading}>
              {" "}
              {Add}
            </Button>
          </Col>
        </Row>
      )} */}
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
  );
};

export default TourFour;
