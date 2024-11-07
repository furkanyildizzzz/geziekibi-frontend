import { Button, ButtonToolbar, Col, Label, Row } from "reactstrap";
import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";
import {
  AddTag,
  ChooseATag,
  Tours,
  ToursCanBeTagged,
} from "@/Constant/constant";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { Option } from "react-bootstrap-typeahead/types/types";
import {
  ApiResponse,
  ErrorValidation,
  TagSuccessResponse,
} from "@/Types/ApiResponseType";
import { getTagList } from "@/app/actions/tag/getTagList";

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
  }, []);

  return (
    <Col sm="6">
      <Row className="g-2 product-tag">
        <Col xs="12">
          <Label className="d-block m-0" for="validationServer01" check>
            {AddTag}
            <span className="txt-danger"> *</span>
          </Label>
        </Col>
        <Col xs="12">
          {/* <Typeahead
            id="multiple-typeahead"
            labelKey="name"
            multiple
            options={MultiWithHeaderData}
          /> */}

          <Typeahead
            // defaultSelected={MultiWithHeaderData.slice(0, 4)}
            id="public-methods-example"
            labelKey="name"
            multiple
            options={tags}
            placeholder={ChooseATag}
            onChange={handleChange}
            ref={ref}
          />
          <p className="f-light">{ToursCanBeTagged} </p>

          <ButtonToolbar className="mt-3">
            <Button onClick={() => ref.current?.clear()}>Clear</Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectTwo;
