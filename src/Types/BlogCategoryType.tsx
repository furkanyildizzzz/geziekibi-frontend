import SVG from "@/Components/SVG/Svg";
import {
  CloudinaryImage,
  BlogCategorySuccessResponse,
} from "./ApiResponseType";
import { useTranslation } from "react-i18next";

export interface BlogCategoryListTableName {
  name?: string;
}

export interface BlogCategoryListTableImageAndName {
  name?: string;
  imageUrl?: string;
}

export interface BlogCategoryListTableDataColumnType {
  id: number;
  name: string;
  parent: BlogCategorySuccessResponse;
  subCategories: BlogCategorySuccessResponse[];
  uploadedPrimaryImages: CloudinaryImage[];
}

const BlogCategoryListTableBlogName: React.FC<BlogCategoryListTableName> = ({
  name,
}) => {
  return (
    <div className="product-names my-2">
      <p>{name}</p>
    </div>
  );
};

const BlogCategoryListTableBlogImageAndName: React.FC<
  BlogCategoryListTableImageAndName
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

const BlogCategoryListTableAction = (props: {
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

export const BlogCategoryListTableDataColumn = (
  editHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: BlogCategoryListTableDataColumnType) => (
        <BlogCategoryListTableAction
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
      selector: (row: BlogCategoryListTableDataColumnType) => `${row.name}`,
      cell: (row: BlogCategoryListTableDataColumnType) => (
        <BlogCategoryListTableBlogImageAndName
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
      selector: (row: BlogCategoryListTableDataColumnType) =>
        `${row.parent.name}`,
      cell: (row: BlogCategoryListTableDataColumnType) => (
        <BlogCategoryListTableBlogName
          name={row.parent ? row.parent.name : ""}
        />
      ),
      sortable: true,
      grow: 1,
    },
  ];
};
