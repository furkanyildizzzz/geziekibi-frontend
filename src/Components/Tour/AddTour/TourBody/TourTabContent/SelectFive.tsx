import { Col, Label, Row } from "reactstrap";
import ReactDatePicker from "react-datepicker";
import { useCallback, useEffect, useState } from "react";
import { PublishDateTime } from "@/Constant/constant";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useTranslation } from "react-i18next";

const SelectFive = () => {
  const dispatch = useAppDispatch();
  const { formValue, isLoading } = useAppSelector((state) => state.addProduct);
  const [date, setDate] = useState<Date>();
  const { t } = useTranslation("common");

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
    <>
      <Label for="validationServer01" check>
        {t("PublishDateTime")}
      </Label>
      <div className="input-group flatpicker-calender product-date">
        <ReactDatePicker
          className="form-control flatpickr-input"
          selected={date}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default SelectFive;
