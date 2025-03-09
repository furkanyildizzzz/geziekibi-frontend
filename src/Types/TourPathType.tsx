import SVG from "@/Components/SVG/Svg";
import {
  CloudinaryImage,
  TourPathSuccessResponse,
} from "./ApiResponseType";
import { useTranslation } from "react-i18next";

export interface TourPathListTableName {
  name?: string;
}

export interface TourPathListTableImageAndName {
  name?: string;
}

export interface TourPathListTableDataColumnType {
  id: number;
  name: string;
}

const TourPathListTableTourName: React.FC<TourPathListTableName> = ({
  name,
}) => {
  return (
    <div className="product-names my-2">
      <p>{name}</p>
    </div>
  );
};

const TourPathListTableAction = (props: {
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

export const TourPathListTableDataColumn = (
  editHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: TourPathListTableDataColumnType) => (
        <TourPathListTableAction
          name={row.name}
          id={row.id}
          handleEdit={editHandler}
          handleDelete={deleteHandler}
        />
      ),
      grow: 0,
    },
    {
      name: t("Path"),
      selector: (row: TourPathListTableDataColumnType) => `${row.name}`,
      cell: (row: TourPathListTableDataColumnType) => (
        <TourPathListTableTourName
          name={row.name}
        />
      ),
      sortable: true,
      grow: 1,
    },
  ];
};
