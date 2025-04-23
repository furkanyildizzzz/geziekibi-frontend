import { AddNewDateInputSchema, AddNewDateSchema } from "@/app/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";
import { tr } from "date-fns/locale/tr";
import { useState } from "react";
import { useAppSelector } from "@/Redux/Hooks";

interface AddNewDateProps {
  handleAddNewDate: (startDate: Date, endDate: Date) => void;
  handleFilterDateList: (startDate: Date, endDate: Date) => void;
}

export const AddNewDate: React.FC<AddNewDateProps> = ({
  handleAddNewDate,
  handleFilterDateList,
}) => {
  const { t } = useTranslation("common");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { isLoading: isLoadingReduxForm } = useAppSelector(
    (state) => state.addProduct
  );

  const {
    handleSubmit,
    formState: { errors, isLoading },
    setValue,
  } = useForm({
    resolver: zodResolver(AddNewDateInputSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    setValue("startDate", date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    setValue("endDate", date);
  };

  const onSubmit = (data: AddNewDateSchema) => {
    console.log({ data });
    handleAddNewDate(data.startDate, data.endDate);
  };

  const onFilter = () => {
    handleFilterDateList(startDate, endDate);
  };

  return (
    <Col lg="12">
      <Card>
        <CardBody>
          <Form
            onSubmit={handleSubmit((data) => {
              onSubmit(data as AddNewDateSchema);
            })}
          >
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              <Col lg="3" xs="12" className="mb-3">
                <Label for="validationServer01" check>
                  {t("Start Date")} <span className="txt-danger"> *</span>
                </Label>
                <div className="input-group flatpicker-calender product-date">
                  <ReactDatePicker
                    className="form-control flatpickr-input"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    locale={tr}
                    dateFormat="yyyy/MM/dd"
                    disabled={isLoading || isLoadingReduxForm}
                  />
                </div>
              </Col>
              <Col lg="3" xs="12" className="mb-3">
                <Label for="validationServer01" check>
                  {t("End Date")} <span className="txt-danger"> *</span>
                </Label>
                <div className="input-group flatpicker-calender product-date">
                  <ReactDatePicker
                    className="form-control flatpickr-input"
                    selected={endDate}
                    onChange={handleEndDateChange}
                    locale={tr}
                    dateFormat="yyyy/MM/dd"
                    disabled={isLoading || isLoadingReduxForm}
                  />
                </div>
              </Col>
              <Col
                lg="3"
                xs="12"
                className="d-flex justify-content-center mb-3"
              >
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading || isLoadingReduxForm}
                >
                  {t("Add")}
                </Button>
              </Col>
              <Col
                lg="3"
                xs="12"
                className="d-flex justify-content-center mb-3"
              >
                <Button
                  type="button"
                  onClick={onFilter}
                  disabled={isLoading || isLoadingReduxForm}
                  style={{
                    backgroundColor: "#007bff", // Custom background color
                    borderColor: "#007bff", // Custom border color
                    color: "white", // Text color
                  }}
                >
                  {t("Filter")}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};
