import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import {
  ChooseTheStatus,
  Drafts,
  Publish,
  PublishStatus,
  Unpublish,
} from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { Col, Input, Label, Row } from "reactstrap";

export const DropDownData = [
  { id: "publish", name: Publish, header: true },
  { id: "draft", name: Drafts },
  { id: "unpublish", name: Unpublish },
];

const SelectFour = () => {
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.addProduct);

  const handleStatus = (select: string) => {
    dispatch(setFormValue({ name: "publishStatus", value: select }));
  };

  const handlePublishStatusChanged = (id: string) => {
    dispatch(setFormValue({ name: "publishStatus", value: id }));
  };

  return (
    <Col sm="6">
      <Row>
        <Col xs="12">
          <Label for="validationServer01" check>
            {PublishStatus}
            <span className="txt-danger"> *</span>
          </Label>

          <DropDownComponent
            id="id"
            title={""}
            isRequired={false}
            labelKey="name"
            multiple={false}
            placeHolder=""
            onChange={handlePublishStatusChanged}
            options={DropDownData.map((item) => {
              return {
                name: item.name,
                id: item.id.toString(),
              };
            })}
            selectedOption={
              formValue.publishStatus
                ? DropDownData.filter(
                    (data) => data.id === formValue.publishStatus
                  )
                : undefined
            }
          />
          {/* 
          <Input
            type="select"
            name="publishStatus"
            onChange={(e) => handleStatus(e.target.value)}
          >
            <option>{Publish}</option>
            <option>{Drafts}</option>
            <option>{Unpublish}</option>
          </Input> */}
          <p className="f-light">{ChooseTheStatus}</p>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectFour;
