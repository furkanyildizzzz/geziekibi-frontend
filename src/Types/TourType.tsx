import SVG from "@/CommonComponent/SVG/Svg";
import { TourCategorySuccessResponse } from "./ApiResponseType";

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
) => [
  {
    name: "Action",
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
    name: "Title",
    selector: (row: TourListTableDataColumnType) => `${row.title}`,
    cell: (row: TourListTableDataColumnType) => (
      <TourListTableTourImageAndName
        title={row.title}
        imageUrl={row.imageUrl}
      />
    ),
    sortable: true,
  },

  {
    name: "Spot",
    selector: (row: TourListTableDataColumnType) => `${row.spot}`,
  },
  {
    name: "Category",
    selector: (row: TourListTableDataColumnType) => `${row.category}`,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row: TourListTableDataColumnType) => `${row.type}`,
    sortable: true,
  },

  {
    name: "Price",
    selector: (row: TourListTableDataColumnType) => `${row.prices[0]?.price}`,
    sortable: true,
  },

  {
    name: "Publish Status",
    selector: (row: TourListTableDataColumnType) => `${row.publishStatus}`,
    sortable: true,
  },

  {
    name: "Publish Date",
    selector: (row: TourListTableDataColumnType) => `${row.publishDate}`,
    sortable: true,
  },
];
