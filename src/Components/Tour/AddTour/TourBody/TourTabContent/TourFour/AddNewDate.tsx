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
  handleAddNewDate: (date: Date) => void;
}

export const AddNewDate: React.FC<AddNewDateProps> = ({ handleAddNewDate }) => {
  const { t } = useTranslation("common");
  const [newDate, setNewDate] = useState(new Date());

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
      newDate: new Date(),
    },
  });

  const handleNewDateChange = (date: Date) => {
    setNewDate(date);
    setValue("newDate", date);
  };

  const onSubmit = (data: AddNewDateSchema) => {
    console.log({ data });
    handleAddNewDate(data.newDate);
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
            {" "}
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              <Col lg="3">
                <Label for="validationServer01" check>
                  {t("Add New Date")} <span className="txt-danger"> *</span>
                </Label>
                <div className="input-group flatpicker-calender product-date">
                  <ReactDatePicker
                    className="form-control flatpickr-input"
                    selected={newDate}
                    onChange={handleNewDateChange}
                    locale={tr}
                    dateFormat="yyyy/MM/dd"
                    disabled={isLoading || isLoadingReduxForm}
                  />
                </div>
              </Col>
              <Col lg="3">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading || isLoadingReduxForm}
                >
                  {t("Add")}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};
