import SVG from "@/Components/SVG/Svg";
import { PageTypeEnumDisplayNames, PageTypeEnum } from "@/app/lib/enums";
import { useTranslation } from "react-i18next";

export interface StaticPageListTableName {
  title?: string;
}

export interface StaticPageListTableDataColumnType {
  id: number;
  title: string;
  pageType: string;
}

const StaticPageListTableStaticPageName: React.FC<StaticPageListTableName> = ({
  title,
}) => {
  return (
    <div className="product-names my-2">
      <p>{title}</p>
    </div>
  );
};

const StaticPageListTableAction = (props: {
  name: string;
  id: number;
  handleEdit: (id: number) => Promise<void>;
  handleDelete: (name: string, id: number) => Promise<void>;
}) => {
  const { name, id, handleEdit, handleDelete } = props;
  return (
    <div className="product-action">
      <SVG iconId="edit-content" onClick={() => handleEdit(id)} />
      <SVG onClick={async () => await handleDelete(name, id)} iconId="trash1" />
    </div>
  );
};

export const StaticPageListTableDataColumn = (
  editHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: StaticPageListTableDataColumnType) => (
        <StaticPageListTableAction
          name={row.title}
          id={row.id}
          handleEdit={editHandler}
          handleDelete={deleteHandler}
        />
      ),
      grow: 0,
    },
    {
      name: t("Title"),
      selector: (row: StaticPageListTableDataColumnType) => `${row.title}`,
      cell: (row: StaticPageListTableDataColumnType) => (
        <StaticPageListTableStaticPageName title={row.title} />
      ),
      sortable: true,
      grow: 1,
    },
    {
      name: t("Page"),
      selector: (row: StaticPageListTableDataColumnType) =>
        `${t(PageTypeEnumDisplayNames[row.pageType as PageTypeEnum])}`,
      sortable: true,
      grow: 1,
    },
  ];
};
