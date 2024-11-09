import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import FormEditors from "./FormEditors";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {
  ChooseTheTourType,
  FinishDate,
  ProductTitle,
  StartDate,
  TourSpot,
  TourTitle,
  TourType,
} from "@/Constant/constant";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import { TourTypeDisplayNames, TourTypeEnum } from "@/app/lib/enums";
import ReactDatePicker from "react-datepicker";
import { useCallback, useEffect, useState } from "react";
import { tr } from "date-fns/locale/tr";

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
  const { formValue } = useAppSelector((state) => state.addProduct);
  const dispatch = useAppDispatch();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [finishDate, setFinishDate] = useState<Date>(new Date());

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    dispatch(setFormValue({ name: "startDate", value: date }));
  };

  const handleFinishDateChange = (date: Date) => {
    setFinishDate(date);
    dispatch(setFormValue({ name: "finishDate", value: date }));
  };

  const initiateDates = useCallback(async () => {
    setStartDate(formValue.startDate || new Date());
    setFinishDate(formValue.finishDate || new Date());
  }, [formValue]);

  useEffect(() => {
    initiateDates();
  }, [initiateDates]);

  const handleTourTypeChanged = (id: string) => {
    dispatch(setFormValue({ name: "tourType", value: id }));
  };

  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-2">
          <Col xs="3">
            <FormGroup>
              <Label for="validationServer01" check>
                {TourType}
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
          <Col xs="2"></Col>

          <Col xs="3">
            <FormGroup>
              <Label for="validationServer01" check>
                {StartDate} <span className="txt-danger"> *</span>
              </Label>
              <div className="input-group flatpicker-calender product-date">
                <ReactDatePicker
                  className="form-control flatpickr-input"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  locale={tr}
                  dateFormat="P p"
                  showTimeSelect
                />
              </div>
            </FormGroup>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Label for="validationServer01" check>
                {FinishDate} <span className="txt-danger"> *</span>
              </Label>
              <div className="input-group flatpicker-calender product-date">
                <ReactDatePicker
                  className="form-control flatpickr-input"
                  selected={finishDate}
                  onChange={handleFinishDateChange}
                  locale={tr}
                  dateFormat="P p"
                  showTimeSelect
                />
              </div>
            </FormGroup>
          </Col>
          <FormGroup>
            <Col xs="12">
              <Label className="m-0" check>
                {TourTitle} <span className="txt-danger"> *</span>
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
                {TourSpot} <span className="txt-danger"> *</span>
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
