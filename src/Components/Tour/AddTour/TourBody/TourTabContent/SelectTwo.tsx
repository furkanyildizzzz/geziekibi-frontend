import { Button, ButtonToolbar, Col, Label, Row } from "reactstrap";
import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";
import { AddTag } from "@/Constant/constant";
import { useRef } from "react";
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { Option } from "react-bootstrap-typeahead/types/types";

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
  const ref = useRef<TypeaheadRef>(null);

  const dispatch = useAppDispatch();

  const handleChange = (selected: Option[]) => {
    console.log({ selected });
    dispatch(setFormValue({ name: "tags", value: selected }));
  };
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
            defaultSelected={MultiWithHeaderData.slice(0, 4)}
            id="public-methods-example"
            labelKey="name"
            multiple
            options={MultiWithHeaderData}
            placeholder="Choose a state..."
            onChange={handleChange}
            ref={ref}
          />
          <p className="f-light">Products can be tagged</p>

          <ButtonToolbar className="mt-3">
            <Button onClick={() => ref.current?.clear()}>Clear</Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectTwo;
