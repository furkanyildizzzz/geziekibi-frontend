import { AddCategory, CreateNewCategoryHeading } from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { Button, Col, Input, Label, Row } from "reactstrap";
import {
  ApiResponse,
  BlogCategorySuccessResponse,
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
import { getBlogCategoryList } from "@/app/actions/blog/category/getBlogCategoryList";
import { useFormContext } from "react-hook-form";
import { BlogValidationSchema } from "@/app/lib/definitions";

interface DropdownBlogCategoryProps {
  onChange: (selectedCategory: BlogCategorySuccessResponse) => void;
  selectedOption: Option[];
}
const DropdownBlogCategory: React.FC<DropdownBlogCategoryProps> = ({
  onChange,
  selectedOption,
}) => {
  const [blogCategories, setBlogCategories] = useState<
    BlogCategorySuccessResponse[]
  >([]);

  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const fetchBlogCategoryList = async () => {
    const response: ApiResponse<BlogCategorySuccessResponse[]> =
      await getBlogCategoryList();
    if ("data" in response) {
      setBlogCategories([...response.data]);
    }
  };

  useEffect(() => {
    fetchBlogCategoryList();
  }, [pathname]);

  const handleCategoryIdChanged = (id: string) => {
    onChange(blogCategories.find((s) => s.id === Number(id))!);
  };

  const handleAdd = () => {
    router.push("/blog/category/add-category");
  };

  return (
    <Col sm="12">
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
            options={blogCategories.map((item) => {
              return {
                name: item.name,
                id: item.id.toString(),
              };
            })}
            selectedOption={selectedOption}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6">
          <Button
            color="transparent"
            tag="a"
            className="button-primary bg-light-primary font-primary"
            onClick={handleAdd}
          >
            <i className="me-2 fa fa-plus"> </i>
            {t("CreateNewCategoryHeading")}
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default DropdownBlogCategory;
