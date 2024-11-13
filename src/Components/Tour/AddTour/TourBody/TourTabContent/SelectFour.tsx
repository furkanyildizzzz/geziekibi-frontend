import { PublishStatusDisplayNames, PublishStatusEnum } from "@/app/lib/enums";
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
import { useTranslation } from "react-i18next";
import { Col, Input, Label, Row } from "reactstrap";

export const DropDownData = [
  {
    id: PublishStatusEnum.PUBLISH,
    name: PublishStatusDisplayNames[PublishStatusEnum.PUBLISH],
    header: true,
  },
  {
    id: PublishStatusEnum.DRAFT,
    name: PublishStatusDisplayNames[PublishStatusEnum.DRAFT],
  },
  {
    id: PublishStatusEnum.UNPUBLISH,
    name: PublishStatusDisplayNames[PublishStatusEnum.UNPUBLISH],
  },
];

const SelectFour = () => {
  const dispatch = useAppDispatch();
  const { formValue, isLoading } = useAppSelector((state) => state.addProduct);
  const { t } = useTranslation("common");

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
            {t("PublishStatus")}
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
            isDisabled={isLoading}
            options={DropDownData.map((item) => {
              return {
                name: t(item.name),
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
