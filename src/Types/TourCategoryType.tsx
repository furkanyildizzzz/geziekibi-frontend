import SVG from "@/CommonComponent/SVG/Svg";
import { TourCategorySuccessResponse } from "./ApiResponseType";

export interface TourCategoryListTableTag {
  name?: string;
}

export interface TourCategoryListTableDataColumnType {
  id: number;
  name: string;
  parent: TourCategorySuccessResponse;
  subCategories: TourCategorySuccessResponse[];
}

const TourCategoryListTableTagName: React.FC<TourCategoryListTableTag> = ({
  name,
}) => {
  return (
    <div className="product-names my-2">
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
) => [
  {
    name: "Action",
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
    name: "Category Name",
    selector: (row: TourCategoryListTableDataColumnType) => `${row.name}`,
    cell: (row: TourCategoryListTableDataColumnType) => (
      <TourCategoryListTableTagName name={row.name} />
    ),
    sortable: true,
    grow: 1,
  },

  {
    name: "Master Name",
    selector: (row: TourCategoryListTableDataColumnType) =>
      `${row.parent.name}`,
    cell: (row: TourCategoryListTableDataColumnType) => (
      <TourCategoryListTableTagName name={row.parent ? row.parent.name : ""} />
    ),
    sortable: true,
    grow: 1,
  },
];
