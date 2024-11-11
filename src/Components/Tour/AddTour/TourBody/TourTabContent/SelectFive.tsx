import { Col, Label, Row } from "reactstrap";
import ReactDatePicker from "react-datepicker";
import { useCallback, useEffect, useState } from "react";
import { PublishDateTime } from "@/Constant/constant";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";

const SelectFive = () => {
  const dispatch = useAppDispatch();
  const { formValue, isLoading } = useAppSelector((state) => state.addProduct);
  const [date, setDate] = useState<Date>();
  const handleChange = (date: Date) => {
    setDate(date);
    dispatch(setFormValue({ name: "publishDate", value: date }));
  };

  const initiatePublishDate = useCallback(async () => {
    const dateValue = formValue.publishDate
      ? new Date(formValue.publishDate)
      : new Date();

    setDate(dateValue);
  }, [formValue]);

  useEffect(() => {
    initiatePublishDate();
  }, [initiatePublishDate]);
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
              selected={date}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectFive;
