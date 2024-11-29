import { PageTypeEnumDisplayNames, PageTypeEnum } from "@/app/lib/enums";
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
    id: PageTypeEnum.PageAboutUs,
    name: PageTypeEnumDisplayNames[PageTypeEnum.PageAboutUs],
    header: true,
  },
  {
    id: PageTypeEnum.PageSecretPolicy,
    name: PageTypeEnumDisplayNames[PageTypeEnum.PageSecretPolicy],
  },
  {
    id: PageTypeEnum.PageUsagePolicy,
    name: PageTypeEnumDisplayNames[PageTypeEnum.PageUsagePolicy],
  },
  {
    id: PageTypeEnum.PageInformationSecurityPolicy,
    name: PageTypeEnumDisplayNames[PageTypeEnum.PageInformationSecurityPolicy],
  },
  {
    id: PageTypeEnum.PageKVKKPolicy,
    name: PageTypeEnumDisplayNames[PageTypeEnum.PageKVKKPolicy],
  },
  {
    id: PageTypeEnum.PageCookiePolicy,
    name: PageTypeEnumDisplayNames[PageTypeEnum.PageCookiePolicy],
  },
  {
    id: PageTypeEnum.PageMembershipAgreementPolicy,
    name: PageTypeEnumDisplayNames[PageTypeEnum.PageMembershipAgreementPolicy],
  },
  {
    id: PageTypeEnum.PageHumanResources,
    name: PageTypeEnumDisplayNames[PageTypeEnum.PageHumanResources],
  },
];

interface SelectPageTypeProps {
  onChange: (id: string) => void;
  pageType: PageTypeEnum;
}

const SelectPageType: React.FC<SelectPageTypeProps> = ({
  onChange,
  pageType,
}) => {
  const { t } = useTranslation("common");

  const handlePageTypeChanged = (id: string) => {
    onChange(id);
  };

  return (
    <Col xs="12">
      <Label for="validationServer01" check>
        {t("PageType")}
        <span className="txt-danger"> *</span>
      </Label>

      <DropDownComponent
        id="id"
        title={""}
        isRequired={false}
        labelKey="name"
        multiple={false}
        placeHolder=""
        onChange={handlePageTypeChanged}
        options={DropDownData.map((item) => {
          return {
            name: t(item.name),
            id: item.id.toString(),
          };
        })}
        selectedOption={DropDownData.filter((data) => data.id === pageType).map(
          (s) => {
            return { ...s, name: t(s.name) };
          }
        )}
      />
    </Col>
  );
};

export default SelectPageType;
