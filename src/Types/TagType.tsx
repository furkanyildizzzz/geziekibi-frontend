import { InputType } from "reactstrap/types/lib/Input";

export interface TagTableDataColumnType {
  id: number;
  name: string;
}

export interface TagTableTour {
  images?: string;
  name?: string;
}

export interface TagType {
  id: number;
  name: string;
}

export interface TagItemInterface {
  id: number;
  name: string;
}

export interface TagModalInterfaceType {
  value: boolean;
  setOpenModal: (value: boolean) => void;
  dataId: undefined | number;
}

export interface ModalTagDetailsProp {
  singleTag: TagItemInterface;
}

export interface ModalQuantityProp {
  quantity: number;
  setQuantity: (key: number) => void;
}

export interface ModalButtonsProp {
  singleTag: TagItemInterface;
  quantity: number;
}

export interface TagListTableDataColumnType {
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
export const TagListTableDataColumn = [
  {
    name: "Tag Name",
    selector: (row: TagListTableDataColumnType) => `${row.name}`,
    cell: (row: TagListTableDataColumnType) => (
      <TagListTableTagName name={row.name} />
    ),
    sortable: true,
    grow: 2,
  },
];
