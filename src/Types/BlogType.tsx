import SVG from "@/Components/SVG/Svg";
import { BlogCategorySuccessResponse } from "./ApiResponseType";
import { Draft, Publish, Unpublish } from "@/Constant/constant";
import {
  PublishStatusDisplayNames,
  PublishStatusEnum,
  LanguageEnumDisplayNames,
  LanguageEnum,
} from "@/app/lib/enums";
import { useTranslation } from "react-i18next";

export interface BlogListTableName {
  title?: string;
  imageUrl?: string;
}

export interface BlogListTableDataColumnType {
  id: number;
  title: string;
  imageUrl: string;
  spot: string;
  language: string;
  publishStatus: string;
  publishDate: Date;
  category: string; //BlogCategorySuccessResponse;
  tags: { id: number; name: string }[];
}

const BlogListTableBlogImageAndName: React.FC<BlogListTableName> = ({
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

const BlogListTableAction = (props: {
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

export const BlogListTableDataColumn = (
  editHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: BlogListTableDataColumnType) => (
        <BlogListTableAction
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
      selector: (row: BlogListTableDataColumnType) => `${row.title}`,
      cell: (row: BlogListTableDataColumnType) => (
        <BlogListTableBlogImageAndName
          title={row.title}
          imageUrl={row.imageUrl}
        />
      ),
      sortable: true,
      grow: 2,
    },

    {
      name: t("Spot"),
      selector: (row: BlogListTableDataColumnType) => `${row.spot}`,
      width: "100px",
    },
    {
      name: t("Category"),
      selector: (row: BlogListTableDataColumnType) => `${row.category}`,
      sortable: true,
      width: "100px",
    },
    {
      name: t("Language"),
      selector: (row: BlogListTableDataColumnType) =>
        `${LanguageEnumDisplayNames[row.language as LanguageEnum]}`,
      sortable: true,
      width: "100px",
    },

    {
      name: t("Tags"),
      selector: (row: BlogListTableDataColumnType) =>
        `${row.tags.map((s) => s.name).join(",")}`,
      sortable: true,
      title: "asdsads",
      width: "100px",
    },

    {
      name: t("PublishStatus"),
      selector: (row: BlogListTableDataColumnType) =>
        t(
          `${PublishStatusDisplayNames[row.publishStatus as PublishStatusEnum]}`
        ),
      sortable: true,
      width: "100px",
    },

    {
      name: t("PublishDate"),
      selector: (row: BlogListTableDataColumnType) => `${row.publishDate}`,
      sortable: true,
      width: "100px",
    },
  ];
};
