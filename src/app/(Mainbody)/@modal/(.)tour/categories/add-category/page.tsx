"use client";
import { createNewTourCategory } from "@/app/actions/tour/category/createNewTourCategory";
import { editTourCategory } from "@/app/actions/tour/category/editTourCategory";
import { getTourCategoryById } from "@/app/actions/tour/category/getTourCategoryById";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import ModalComponent from "@/CommonComponent/Modal";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import {
  Cancel,
  Edit,
  CreateNewTourCategoryHeading,
  CategoryName,
  Description,
} from "@/Constant/constant";
import useFormState from "@/hooks/useFormState";
import { TourCategorySuccessResponse } from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";

const AddTourCategoryModal = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const router = useRouter();

  const [tourCategories, setTourCategories] = useState<
    TourCategorySuccessResponse[]
  >([]);

  const {
    isLoading,
    errorMessage,
    errorsValidation,
    isSuccess,
    inputValues,
    setFormValues,
    handleChange,
    handleSubmit,
    resetFormState,
    setInputValues,
  } = useFormState();

  const fetchTourCategoryList = async () => {
    const response = await getTourCategoryList();
    if ("data" in response) {
      console.log({ response });
      setTourCategories([...response.data]);
    }
  };

  useEffect(() => {
    fetchTourCategoryList();
    if (isSuccess) {
      resetFormState();
      router.back();
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   console.log({ inputValues });
  // }, [inputValues]);

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(event, createNewTourCategory);
  };

  const handleParentIdChanged = (id: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      parentid: id,
    }));
  };

  return (
    <ModalComponent title={CreateNewTourCategoryHeading}>
      <Form className="theme-form" onSubmit={formSubmitHandle}>
        <Col xs="12">
          <DisplayError errorMessage={errorMessage} />
          <FormGroup>
            <Label for="name" check>
              {CategoryName} <span className="txt-danger"> *</span>
            </Label>
            <Input
              name="name"
              className="m-0"
              id="name"
              value={inputValues.name}
              type="text"
              onChange={handleChange}
              required
            />
            <DisplayError errorsValidation={errorsValidation} keyProp="name" />{" "}
          </FormGroup>
          <FormGroup>
            <Label for="description" check>
              {Description}
            </Label>
            <Input
              name="description"
              className="m-0"
              id="description"
              value={inputValues.description}
              type="text"
              onChange={handleChange}
            />
            <DisplayError
              errorsValidation={errorsValidation}
              keyProp="description"
            />{" "}
          </FormGroup>

          <FormGroup>
            <DropDownComponent
              id="parentid"
              title="Select Parent"
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
              errorsValidation={errorsValidation}
              keyProp="parentid"
            />{" "}
          </FormGroup>
        </Col>
        <Col
          xs="12"
          style={{ display: "flex", justifyContent: "flex-end", gap: "3%" }}
        >
          <Button
            color="light"
            onClick={() => {
              router.back();
            }}
            disabled={isLoading}
          >
            {" "}
            {Cancel}
          </Button>
          <Button color="primary" type="submit" disabled={isLoading}>
            {" "}
            {Edit}
          </Button>
        </Col>
      </Form>
    </ModalComponent>
  );
};

export default AddTourCategoryModal;
