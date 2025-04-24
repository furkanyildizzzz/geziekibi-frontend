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

interface SelectPublishStatusProps {
  onChange: (id: string) => void;
  publishStatus: PublishStatusEnum;
}

const SelectPublishStatus: React.FC<SelectPublishStatusProps> = ({
  onChange,
  publishStatus,
}) => {
  const { t } = useTranslation("common");

  const handlePublishStatusChanged = (id: string) => {
    onChange(id);
  };

  return (
    <>
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
        options={DropDownData.map((item) => {
          return {
            name: t(item.name),
            id: item.id.toString(),
          };
        })}
        selectedOption={DropDownData.filter(
          (data) => data.id === publishStatus
        ).map((s) => {
          return { ...s, name: t(s.name) };
        })}
      />
    </>
  );
};

export default SelectPublishStatus;
