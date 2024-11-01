import { Col, Input, Label, Tooltip } from "reactstrap";
import { useState } from "react";
import {
  TypesOfProductDiscount,
  TypesOfTourDiscountConstant,
} from "@/Constant/constant";

export const TypesOfTourDiscountData = [
  {
    id: "radio-icon",
    check: true,
    title: "Fixed Price",
  },
  {
    id: "radio-icon4",
    title: "BOGO(Buy one, Get one)",
    selected: true,
  },
  {
    id: "radio-icon5",
    title: "Seasonal or holiday discount",
  },
  {
    id: "radio-icon6",
    title: "Percentage-based discount(%)",
  },
  {
    id: "radio-icon7",
    title: "Volume or bulk discount",
  },
];

const TypesOfTourDiscount = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Col xs="12">
      <Label for="exampleFormControlInput1" check>
        {TypesOfTourDiscountConstant}
        <i className="icon-help-alt ms-1" id="tooltip1" />
        <Tooltip
          target="tooltip1"
          placement="top"
          toggle={toggle}
          isOpen={tooltipOpen}
        >
          {
            "Choose the kind of discount that will be used on that particular item."
          }
        </Tooltip>
      </Label>
      <ul className="radio-wrapper">
        {TypesOfTourDiscountData.map((data, i) => (
          <li key={i}>
            <Input
              id={data.id}
              type="radio"
              name="radio5"
              defaultValue="option5"
            />
            <Label className="form-check-label" for={data.id} check>
              <span>{data.title}</span>
            </Label>
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default TypesOfTourDiscount;
