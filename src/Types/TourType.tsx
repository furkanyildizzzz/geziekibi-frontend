import SVG from "@/CommonComponent/SVG/Svg";
import { TourCategorySuccessResponse } from "./ApiResponseType";
import { Draft, Publish, Unpublish } from "@/Constant/constant";
import {
  PublishStatusDisplayNames,
  PublishStatusEnum,
  TourTypeDisplayNames,
  TourTypeEnum,
} from "@/app/lib/enums";
import { useTranslation } from "react-i18next";

export interface TourListTableName {
  title?: string;
  imageUrl?: string;
}

export interface TourListTableDataColumnType {
  id: number;
  title: string;
  imageUrl: string;
  spot: string;
  type: string;
  publishStatus: string;
  publishDate: Date;
  category: string; //TourCategorySuccessResponse;
  prices: { name: string; description: string; price: number }[];
}

const TourListTableTourImageAndName: React.FC<TourListTableName> = ({
  title,
  imageUrl,
}) => {
  return (
    <div className="product-names my-2">
      <div className="light-product-box bg-img-cover">
        <img className="img-fluid" src={`${imageUrl}`} />
      </div>
      <p>{title}</p>
    </div>
  );
};

const TourListTableAction = (props: {
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

export const TourListTableDataColumn = (
  editHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: TourListTableDataColumnType) => (
        <TourListTableAction
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
      selector: (row: TourListTableDataColumnType) => `${row.title}`,
      cell: (row: TourListTableDataColumnType) => (
        <TourListTableTourImageAndName
          title={row.title}
          imageUrl={row.imageUrl}
        />
      ),
      sortable: true,
      grow: 2,
    },

    {
      name: t("Spot"),
      selector: (row: TourListTableDataColumnType) => `${row.spot}`,
    },
    {
      name: t("Category"),
      selector: (row: TourListTableDataColumnType) => `${row.category}`,
      sortable: true,
    },
    {
      name: t("Type"),
      selector: (row: TourListTableDataColumnType) =>
        `${TourTypeDisplayNames[row.type as TourTypeEnum]}`,
      sortable: true,
    },

    {
      name: t("Price"),
      selector: (row: TourListTableDataColumnType) => `${row.prices[0]?.price}`,
      sortable: true,
    },

    {
      name: t("PublishStatus"),
      selector: (row: TourListTableDataColumnType) =>
        t(
          `${PublishStatusDisplayNames[row.publishStatus as PublishStatusEnum]}`
        ),
      sortable: true,
    },

    {
      name: t("PublishDate"),
      selector: (row: TourListTableDataColumnType) => `${row.publishDate}`,
      sortable: true,
    },
  ];
};
