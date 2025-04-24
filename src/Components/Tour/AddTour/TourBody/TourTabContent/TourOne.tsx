import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import FormEditors from "./FormEditors";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { ChooseTheTourType } from "@/Constant/constant";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import { TourTypeDisplayNames, TourTypeEnum } from "@/app/lib/enums";
import ReactDatePicker from "react-datepicker";
import { useCallback, useEffect, useState } from "react";
import { tr } from "date-fns/locale/tr";
import { useTranslation } from "react-i18next";
import tourFunctions from "@/utils/tourFunctions";

export const DropDownData = [
  {
    id: TourTypeEnum.YURTICI,
    name: TourTypeDisplayNames[TourTypeEnum.YURTICI],
    header: true,
  },
  {
    id: TourTypeEnum.YURTDISI,
    name: TourTypeDisplayNames[TourTypeEnum.YURTDISI],
  },
  {
    id: TourTypeEnum.GUNUBIRLIK,
    name: TourTypeDisplayNames[TourTypeEnum.GUNUBIRLIK],
  },
];

const TourOne = () => {
  const { isLoading, formValue } = useAppSelector((state) => state.addProduct);
  const dispatch = useAppDispatch();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [daysAndNights, setDaysAndNights] = useState<{
    days: number;
    nights: number;
  }>({ days: 0, nights: 0 });

  const { t } = useTranslation("common");

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    dispatch(setFormValue({ name: "startDate", value: date }));
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    dispatch(setFormValue({ name: "endDate", value: date }));
  };

  const initiateDates = useCallback(async () => {
    const startDateValue = formValue.startDate
      ? new Date(formValue.startDate)
      : new Date();
    setStartDate(new Date(startDateValue));
    const endDateValue = formValue.endDate
      ? new Date(formValue.endDate)
      : new Date();
    setEndDate(new Date(endDateValue));
  }, [formValue]);

  useEffect(() => {
    initiateDates();
  }, [initiateDates]);

  useEffect(() => {
    if (startDate && endDate) {
      const result = tourFunctions.calculateDaysAndNights(startDate, endDate);
      setDaysAndNights(result);
    } else {
      setDaysAndNights({ days: 0, nights: 0 });
    }
  }, [startDate, endDate]);

  const handleTourTypeChanged = (id: string) => {
    dispatch(setFormValue({ name: "tourType", value: id }));
  };

  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-2">
          <Col lg="3" xs="12">
            <FormGroup>
              <Label for="validationServer01" check>
                {t("TourType")}
                <span className="txt-danger"> *</span>
              </Label>

              <DropDownComponent
                id="id"
                title={""}
                isRequired={false}
                labelKey="name"
                multiple={false}
                placeHolder=""
                onChange={handleTourTypeChanged}
                isDisabled={isLoading}
                options={DropDownData.map((item) => {
                  return {
                    name: item.name,
                    id: item.id.toString(),
                  };
                })}
                selectedOption={
                  formValue.tourType
                    ? DropDownData.filter(
                        (data) => data.id === formValue.tourType
                      )
                    : undefined
                }
              />
              <p className="f-light">{ChooseTheTourType}</p>
            </FormGroup>
          </Col>

          <Col lg="3" xs="12" className="d-none d-lg-block" />
          <Col lg="6" xs="12">
            <Row className="g-2">
              <Col lg="6" xs="12">
                <FormGroup>
                  <Label for="validationServer01" check>
                    {t("TourStartDate")} <span className="txt-danger"> *</span>
                  </Label>
                  <div className="input-group flatpicker-calender product-date">
                    <ReactDatePicker
                      className="form-control flatpickr-input"
                      selected={startDate}
                      onChange={handleStartDateChange}
                      locale={tr}
                      dateFormat="yyyy/MM/dd HH:mm"
                      showTimeSelect
                      disabled={isLoading}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col lg="6" xs="12">
                <FormGroup>
                  <Label for="validationServer01" check>
                    {t("TourEndDate")} <span className="txt-danger"> *</span>
                  </Label>
                  <div className="input-group flatpicker-calender product-date">
                    <ReactDatePicker
                      className="form-control flatpickr-input"
                      selected={endDate}
                      onChange={handleEndDateChange}
                      locale={tr}
                      dateFormat="yyyy/MM/dd HH:mm"
                      showTimeSelect
                      disabled={isLoading}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                {daysAndNights.days > 0 && (
                  <div>
                    <span className="badge bg-secondary text-light">
                      {daysAndNights.nights} gece
                    </span>
                    <span className="badge bg-info text-dark me-2">
                      {daysAndNights.days} gün
                    </span>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row className="g-2">
          <FormGroup>
            <Col xs="12">
              <Label className="m-0" check>
                {t("TourTitle")} <span className="txt-danger"> *</span>
              </Label>
            </Col>
            <Col xs="12">
              <div className="custom-input">
                <Input
                  className={formValue.title !== "" ? "valid" : "is-invalid"}
                  type="text"
                  required
                  name="title"
                  value={formValue.title}
                  disabled={isLoading}
                  onChange={(e) =>
                    dispatch(
                      setFormValue({ name: "title", value: e.target.value })
                    )
                  }
                />
              </div>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xs="12">
              <Label className="m-0" check>
                {t("TourSpot")} <span className="txt-danger"> *</span>
              </Label>
            </Col>
            <Col xs="12">
              <div className="custom-input">
                <Input
                  className={formValue.spot !== "" ? "valid" : "is-invalid"}
                  type="textarea"
                  required
                  value={formValue.spot}
                  name="spot"
                  disabled={isLoading}
                  onChange={(e) =>
                    dispatch(
                      setFormValue({ name: "spot", value: e.target.value })
                    )
                  }
                />
              </div>
            </Col>
          </FormGroup>
          <FormGroup>
            <FormEditors />
          </FormGroup>
        </Row>
      </Form>
    </div>
  );
};

export default TourOne;
