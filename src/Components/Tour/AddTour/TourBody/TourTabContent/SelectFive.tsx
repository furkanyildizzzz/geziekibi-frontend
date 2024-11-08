import { Col, Label, Row } from "reactstrap";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import { PublishDateTime } from "@/Constant/constant";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";

const SelectFive = () => {
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.addProduct);
  const [startDate, setStartDate] = useState(new Date());
  const handleChange = (date: Date) => {
    setStartDate(date);
    dispatch(setFormValue({ name: "publishDate", value: date }));
  };

  return (
    <Col sm="6">
      <Row>
        <Col xs="12">
          <Label for="validationServer01" check>
            {PublishDateTime}
          </Label>
          <div className="input-group flatpicker-calender product-date">
            <ReactDatePicker
              className="form-control flatpickr-input"
              selected={startDate}
              onChange={handleChange}
              value={new Date(formValue.publishDate).toLocaleDateString()}
            />
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectFive;
