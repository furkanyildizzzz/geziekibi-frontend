import { InputType } from "reactstrap/types/lib/Input";
import Link from "next/link";
import SVG from "@/CommonComponent/SVG/Svg";
import { deleteTag } from "@/app/actions/tag/deleteTag";
import { TagSuccessResponse } from "./ApiResponseType";

export interface TagTableDataColumnType {
  id: number;
  name: string;
}

export interface TagListTableDataColumnType {
  id: number;
  name: string;
}

export interface TagListTableTag {
  name?: string;
}

const TagListTableTagName: React.FC<TagListTableTag> = ({ name }) => {
  return (
    <div className="product-names my-2">
      <p>{name}</p>
    </div>
  );
};

const TagListTableAction = (props: {
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

export const TagListTableDataColumn = (
  editHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => [
  {
    name: "Action",
    cell: (row: TagListTableDataColumnType) => (
      <TagListTableAction
        name={row.name}
        id={row.id}
        handleEdit={editHandler}
        handleDelete={deleteHandler}
      />
    ),
    grow: 0,
  },
  {
    name: "Tag Name",
    selector: (row: TagListTableDataColumnType) => `${row.name}`,
    cell: (row: TagListTableDataColumnType) => (
      <TagListTableTagName name={row.name} />
    ),
    sortable: true,
    grow: 1,
  },
];
