import { Button, ButtonToolbar, Col, Label, Row } from "reactstrap";
import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";
import {
  AddTag,
  ChooseATag,
  CreateNewTagHeading,
  Tours,
  ToursCanBeTagged,
} from "@/Constant/constant";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { Option } from "react-bootstrap-typeahead/types/types";
import {
  ApiResponse,
  ErrorValidation,
  TagSuccessResponse,
} from "@/Types/ApiResponseType";
import { getTagList } from "@/app/actions/tag/getTagList";
import CreateNewTag from "@/Components/Tag/CreateNewTag";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const MultiWithHeaderData = [
  { name: "NBA Teams", header: true },
  { name: "Boston Celtics" },
  { name: "Dallas Mavericks" },
  { name: "Brooklyn Nets" },
  { name: "New Orleans Hornets" },
  { name: "Washington Wizards" },
  { name: "Sacramento King" },
  { name: "", divider: true },
  { name: "NHL Teams", header: true },
  { name: "Boston Celtics" },
  { name: "Los Angeles Lakers" },
  { name: "Orlando Magic" },
];

const SelectTwo = () => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [tags, setTags] = useState<TagSuccessResponse[]>([]);

  const ref = useRef<TypeaheadRef>(null);

  const dispatch = useAppDispatch();
  const { formValue, isLoading } = useAppSelector((state) => state.addProduct);

  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const handleChange = (selected: Option[]) => {
    dispatch(setFormValue({ name: "tags", value: selected }));
  };

  const fetchTagList = async () => {
    const response: ApiResponse<TagSuccessResponse[]> = await getTagList();
    if ("data" in response) {
      setTags([...response.data]);
    }
  };

  useEffect(() => {
    fetchTagList();
  }, [pathname]);

  const handleAdd = () => {
    router.push("/tags/add-tag");
  };

  return (
    <Row className="g-2 product-tag">
      <Col xs="12">
        <Label className="d-block m-0" for="validationServer01" check>
          {t("SelectTag")}
          <span className="txt-danger"> *</span>
        </Label>
      </Col>
      <Col xs="12">
        <Typeahead
          // defaultSelected={MultiWithHeaderData.slice(0, 4)}
          id="public-methods-example"
          labelKey="name"
          multiple
          options={tags}
          onChange={handleChange}
          ref={ref}
          disabled={isLoading}
          selected={
            formValue.tags.length
              ? formValue.tags.map((tag: { id: number; name: string }) => tag)
              : undefined
          }
        />
      </Col>

      <Col xs="6">
        <ButtonToolbar className="mt-3">
          <Button onClick={() => ref.current?.clear()} disabled={isLoading}>
            {t("Clear")}
          </Button>
        </ButtonToolbar>
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
          {t("CreateNewTagHeading")}
        </Button>
      </Col>
    </Row>
  );
};

export default SelectTwo;
