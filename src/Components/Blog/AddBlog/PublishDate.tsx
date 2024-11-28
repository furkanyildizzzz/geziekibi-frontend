import { Col, Label, Row } from "reactstrap";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PublishDateProps {
  onChange: (date: Date) => void;
  publisDate: Date;
}

const PublishDate: React.FC<PublishDateProps> = ({ onChange, publisDate }) => {
  const [date, setDate] = useState<Date>(publisDate);
  const { t } = useTranslation("common");

  const handleChange = (date: Date) => {
    setDate(date);
    onChange(date);
  };

  return (
    <Col xs="12">
      <Label for="validationServer01" check>
        {t("PublishDateTime")} <span className="txt-danger"> *</span>
      </Label>
      <div className="input-group flatpicker-calender product-date">
        <ReactDatePicker
          className="form-control flatpickr-input"
          selected={date}
          onChange={handleChange}
        />
      </div>
    </Col>
  );
};

export default PublishDate;
