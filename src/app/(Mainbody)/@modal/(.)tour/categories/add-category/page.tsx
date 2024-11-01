"use client";
import { createNewTourCategory } from "@/app/actions/tour/category/createNewTourCategory";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import {
  CreateTourCategoryFormSchema,
  CreateTourCategorySchema,
} from "@/app/lib/definitions";
import ModalComponent from "@/CommonComponent/Modal";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import {
  Cancel,
  Edit,
  CreateNewTourCategoryHeading,
  CategoryName,
  Description,
} from "@/Constant/constant";
import {
  ErrorValidation,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";

const AddTourCategoryModal = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [tourCategories, setTourCategories] = useState<
    TourCategorySuccessResponse[]
  >([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isLoading, errors },
  } = useForm({
    resolver: zodResolver(CreateTourCategoryFormSchema),
    defaultValues: {
      name: "New Category",
      description: "",
      parentid: -1,
    },
  });

  const fetchTourCategoryList = async () => {
    const response = await getTourCategoryList();
    if ("data" in response) {
      console.log({ response });
      setTourCategories([...response.data]);
    }
  };

  useEffect(() => {
    fetchTourCategoryList();
  }, []);

  const handleParentIdChanged = (id: string) => {
    setValue("parentid", Number(id));
  };

  const onsubmit = async (data: CreateTourCategorySchema) => {
    console.log({ data });
    const response = await createNewTourCategory(data);
    console.log({ response });

    if ("errorType" in response) {
      if (response.errorType == "Validation")
        setErrorsValidation(response.errorsValidation!);
      else setErrorMessage(response.errorMessage);
    } else {
      router.back(); // Close modal by navigating back
    }
    return;
  };

  return (
    <ModalComponent title={CreateNewTourCategoryHeading}>
      <Form
        className="theme-form"
        onSubmit={handleSubmit(
          async (data) => await onsubmit(data as CreateTourCategorySchema)
        )}
      >
        <Col xs="12">
          <DisplayError errorMessage={errorMessage} />
          <FormGroup>
            <Label for="name" check>
              {CategoryName} <span className="txt-danger"> *</span>
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
              errors={errors}
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
