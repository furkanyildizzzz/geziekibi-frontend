import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
  Add,
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
import { useState } from "react";
import { ErrorValidation } from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { createNewTourPrice } from "@/app/actions/tour/price/createNewTourPrice";
import { current } from "@reduxjs/toolkit";
import { CurrencyDisplayNames, CurrencyEnum } from "@/app/lib/enums";

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

const RemoveButton = ({ onClick }: { onClick: Function }) => {
  return (
    <span className="iconbg badge-light-danger">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="stroke-danger"
        onClick={() => onClick()}
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </span>
  );
};

const AddTourPriceForm = ({
  onsubmit,
  onremove,
}: {
  onsubmit: Function;
  onremove: Function;
}) => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { formValue } = useAppSelector((state) => state.addProduct);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(CreateTourPriceFormSchema),
    defaultValues: {
      name: "New Price",
      price: 4500,
      currency: CurrencyEnum.TRY,
      description: "",
    },
  });

  // const onsubmit = async (data: CreateTourPriceSchema) => {
  //   console.log({ data });
  //   // const response = await createNewTourPrice(data);
  //   // console.log({ response });

  //   // if ("errorType" in response) {
  //   //   if (response.errorType == "Validation")
  //   //     setErrorsValidation(response.errorsValidation!);
  //   //   else setErrorMessage(response.errorMessage);
  //   // } else {
  //   //   // router.back(); // Close modal by navigating back
  //   // }
  //   return;
  // };

  const handleCurrencyChanged = (id: string) => {
    setValue("currency", id as CurrencyEnum);
  };
  return (
    <Form
      className="theme-form"
      onSubmit={handleSubmit((data) => {
        setIsSubmitted(true);
        onsubmit(data as CreateTourPriceSchema);
      })}
    >
      <Row>
        {/* <Col xs="1" style={{ alignSelf: "center", cursor: "pointer" }}>
          <RemoveButton onClick={onremove} />
        </Col> */}
        <Col xs="3">
          <FormGroup>
            <Label for="name" check>
              {SellingPriceName} <span className="txt-danger"> *</span>
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
        </Col>
        <Col xs="2">
          <FormGroup>
            <Label for="price" check>
              {SellingPrice} <span className="txt-danger"> *</span>
            </Label>
            <input
              type="number"
              className="m-0 form-control"
              id="price"
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
              {SellingCurrency} <span className="txt-danger"> *</span>
            </Label>
            <DropDownComponent
              id="id"
              title={""}
              isRequired={false}
              labelKey="name"
              multiple={false}
              placeHolder=""
              onChange={handleCurrencyChanged}
              options={DropDownData.map((item) => {
                return {
                  name: item.name,
                  id: item.id.toString(),
                };
              })}
              selectedOption={
                formValue.publishStatus
                  ? DropDownData.filter(
                      (data) => data.id === formValue.publishStatus
                    )
                  : undefined
              }
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
              {Description}
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
        </Col>
        <Col xs="1" style={{ alignSelf: "center", cursor: "pointer" }}>
          <Button color="primary" type="submit" disabled={isLoading}>
            {" "}
            {Add}
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
  );
};
export default AddTourPriceForm;
