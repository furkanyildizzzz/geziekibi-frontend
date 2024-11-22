import SVG from "@/CommonComponent/SVG/Svg";
import {
  CloudinaryImage,
  TourCategorySuccessResponse,
} from "./ApiResponseType";
import { useTranslation } from "react-i18next";

export interface TourCategoryListTableName {
  name?: string;
}

export interface TourCategoryListTableImageAndName {
  name?: string;
  imageUrl?: string;
}

export interface TourCategoryListTableDataColumnType {
  id: number;
  name: string;
  parent: TourCategorySuccessResponse;
  subCategories: TourCategorySuccessResponse[];
  uploadedPrimaryImages: CloudinaryImage[];
}

const TourCategoryListTableTourName: React.FC<TourCategoryListTableName> = ({
  name,
}) => {
  return (
    <div className="product-names my-2">
      <p>{name}</p>
    </div>
  );
};

const TourCategoryListTableTourImageAndName: React.FC<
  TourCategoryListTableImageAndName
> = ({ name, imageUrl }) => {
  return (
    <div className="product-names my-2">
      <div className="light-product-box bg-img-cover">
        <img className="img-fluid" src={`${imageUrl}`} />
      </div>
      <p>{name}</p>
    </div>
  );
};

const TourCategoryListTableAction = (props: {
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

export const TourCategoryListTableDataColumn = (
  editHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: TourCategoryListTableDataColumnType) => (
        <TourCategoryListTableAction
          name={row.name}
          id={row.id}
          handleEdit={editHandler}
          handleDelete={deleteHandler}
        />
      ),
      grow: 0,
    },
    {
      name: t("CategoryName"),
      selector: (row: TourCategoryListTableDataColumnType) => `${row.name}`,
      cell: (row: TourCategoryListTableDataColumnType) => (
        <TourCategoryListTableTourImageAndName
          name={row.name}
          imageUrl={
            row.uploadedPrimaryImages?.length
              ? row.uploadedPrimaryImages[0].url
              : ""
          }
        />
      ),
      sortable: true,
      grow: 1,
    },

    {
      name: t("MasterCategoryName"),
      selector: (row: TourCategoryListTableDataColumnType) =>
        `${row.parent.name}`,
      cell: (row: TourCategoryListTableDataColumnType) => (
        <TourCategoryListTableTourName
          name={row.parent ? row.parent.name : ""}
        />
      ),
      sortable: true,
      grow: 1,
    },
  ];
};
