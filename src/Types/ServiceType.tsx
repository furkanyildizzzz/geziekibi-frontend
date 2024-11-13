import SVG from "@/CommonComponent/SVG/Svg";
import { TourCategorySuccessResponse } from "./ApiResponseType";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export interface ServiceListTableName {
  name?: string;
}

export interface ServiceListTableDataColumnType {
  id: number;
  name: string;
  description: string;
}

const TourCategoryListTableTagName: React.FC<ServiceListTableName> = ({
  name,
}) => {
  return (
    <div className="product-names my-2">
      <p>{name}</p>
    </div>
  );
};

const ServiceListTableAction = (props: {
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

export const ServiceListTableDataColumn = (
  editHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: ServiceListTableDataColumnType) => (
        <ServiceListTableAction
          name={row.name}
          id={row.id}
          handleEdit={editHandler}
          handleDelete={deleteHandler}
        />
      ),
      grow: 0,
    },
    {
      name: t("ServiceName"),
      selector: (row: ServiceListTableDataColumnType) => `${row.name}`,
      cell: (row: ServiceListTableDataColumnType) => (
        <TourCategoryListTableTagName name={row.name} />
      ),
      sortable: true,
      grow: 1,
    },

    {
      name: t("Description"),
      selector: (row: ServiceListTableDataColumnType) => `${row.description}`,
      cell: (row: ServiceListTableDataColumnType) => (
        <TourCategoryListTableTagName name={row.description} />
      ),
      sortable: true,
      grow: 1,
    },
  ];
};
