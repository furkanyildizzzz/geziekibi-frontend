import { TourTypeDisplayNames, TourTypeEnum } from "@/app/lib/enums";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import {
  ChooseTheTourType,
  Yurtici,
  Yurtdisi,
  TourType,
  Gunubirlik,
} from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { Col, Input, Label, Row } from "reactstrap";

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

const SelectThree = () => {
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.addProduct);

  const handleStatus = (select: string) => {
    dispatch(setFormValue({ name: "tourType", value: select }));
  };

  const handleTourTypeChanged = (id: string) => {
    dispatch(setFormValue({ name: "tourType", value: id }));
  };

  return (
    <Col sm="6">
      <Row>
        <Col xs="12">
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
                ? DropDownData.filter((data) => data.id === formValue.tourType)
                : undefined
            }
          />
          <p className="f-light">{ChooseTheTourType}</p>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectThree;
