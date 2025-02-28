import SVG from "@/Components/SVG/Svg";
import { useTranslation } from "react-i18next";
import {
  EmailTemplateEnum,
  EmailTemplateEnumDisplayNames,
} from "@/app/lib/enums";

export interface EmailTemplateTableDataColumnType {
  name: string;
}

export interface EmailTemplateListTableDataColumnType {
  key: EmailTemplateEnum;
}

export interface EmailTemplateListTableEmailTemplate {
  keyProp: EmailTemplateEnum;
}

const EmailTemplateListTableEmailTemplateName: React.FC<
  EmailTemplateListTableEmailTemplate
> = ({ keyProp }) => {
  return (
    <div className="product-names my-2">
      <p>{EmailTemplateEnumDisplayNames[keyProp].toString()}</p>
    </div>
  );
};

const EmailTemplateListTableAction = (props: {
  keyProp: EmailTemplateEnum;
  handleEdit: (key: EmailTemplateEnum) => Promise<void>;
}) => {
  const { keyProp, handleEdit } = props;
  return (
    <div className="product-action">
      <SVG iconId="edit-content" onClick={() => handleEdit(keyProp)} />
    </div>
  );
};

export const EmailTemplateListTableDataColumn = (
  editHandler: (key: EmailTemplateEnum) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: EmailTemplateListTableDataColumnType) => (
        <EmailTemplateListTableAction
          keyProp={row.key}
          handleEdit={editHandler}
        />
      ),
      grow: 0,
    },

    {
      name: t("Template"),
      selector: (row: EmailTemplateListTableDataColumnType) => `${row.key}`,
      cell: (row: EmailTemplateListTableDataColumnType) => (
        <EmailTemplateListTableEmailTemplateName keyProp={row.key} />
      ),
      sortable: true,
      grow: 1,
    },
  ];
};
