import { AddCategory, CreateNewCategoryHeading } from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { Button, Col, Input, Label, Row } from "reactstrap";
import CreateNewCategory from "./CreateNewCategory";
import {
  ApiResponse,
  ErrorValidation,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { useEffect, useState } from "react";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import DisplayError from "@/utils/DisplayError";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import { Option } from "react-bootstrap-typeahead/types/types";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const SelectOne = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [tourCategories, setTourCategories] = useState<
    TourCategorySuccessResponse[]
  >([]);

  const { formValue, isLoading } = useAppSelector((state) => state.addProduct);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const handleCategory = (select: string) => {
    dispatch(setFormValue({ name: "category", value: select }));
  };

  const fetchTourCategoryList = async () => {
    const response: ApiResponse<TourCategorySuccessResponse[]> =
      await getTourCategoryList();
    if ("data" in response) {
      setTourCategories([...response.data]);
    }
  };

  useEffect(() => {
    fetchTourCategoryList();
  }, [pathname]);

  const handleCategoryIdChanged = (id: string) => {
    dispatch(
      setFormValue({
        name: "category",
        value: tourCategories.find((s) => s.id === Number(id)),
      })
    );
  };

  const handleAdd = () => {
    router.push("/tour/category/add-category");
  };

  return (
    <Row className="g-2">
      <Col xs="12">
        <Label className="m-0">
          {t("SelectCategory")}
          <span className="txt-danger"> *</span>
        </Label>
      </Col>
      <Col xs="12">
        <DropDownComponent
          id="id"
          title={""}
          isRequired={false}
          labelKey="name"
          multiple={false}
          placeHolder=""
          onChange={handleCategoryIdChanged}
          isDisabled={isLoading}
          options={tourCategories.map((item) => {
            return {
              name: item.name,
              id: item.id.toString(),
            };
          })}
          selectedOption={
            formValue.category
              ? [
                  {
                    name: formValue.category.name,
                    id: formValue.category.id.toString(),
                  },
                ]
              : undefined
          }
        />
        <DisplayError errorsValidation={errorsValidation} keyProp="parentid" />{" "}
      </Col>

      <Col xs="12" md="6">
        <Button
          color="transparent"
          tag="a"
          disabled={isLoading}
          className="button-primary bg-light-primary font-primary w-100 d-flex align-items-center justify-content-center"
          style={{ whiteSpace: "nowrap" }}
          onClick={handleAdd}
        >
          <i className="me-2 fa fa-plus"> </i>
          {t("CreateNewCategoryHeading")}
        </Button>
      </Col>
    </Row>
  );
};

export default SelectOne;
