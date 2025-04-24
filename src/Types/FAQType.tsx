import { InputType } from "reactstrap/types/lib/Input";
import Link from "next/link";
import SVG from "@/Components/SVG/Svg";
import { deleteTag } from "@/app/actions/tag/deleteTag";
import { TagSuccessResponse } from "./ApiResponseType";
import { useTranslation } from "react-i18next";

export interface FAQTableDataColumnType {
  id: number;
  name: string;
}

export interface FAQListTableDataColumnType {
  id: number;
  Order: number;
  Question: string;
  Answer: string;
}

export interface FAQListTableFAQ {
  name?: string;
  order?: number;
}

const FAQListTableFAQName: React.FC<FAQListTableFAQ> = ({ name }) => {
  return (
    <>
      <div className="product-names my-2 d-block d-sm-none">
        <p className="text-truncate mb-0" style={{ maxWidth: "100%" }}>
          {name}
        </p>
      </div>
      <div className="product-names my-2 d-none d-sm-block">
        <p className="mb-0">{name}</p>
      </div>
    </>
  );
};

const FAQListTableFAQOrder: React.FC<FAQListTableFAQ> = ({ order }) => {
  return (
    <div className="product-names my-2">
      <p>{order}</p>
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

export const FAQListTableDataColumn = (
  editHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: FAQListTableDataColumnType) => (
        <TagListTableAction
          name={row.Question}
          id={row.id}
          handleEdit={editHandler}
          handleDelete={deleteHandler}
        />
      ),
      grow: 0,
    },
    {
      name: t("Order"),
      selector: (row: FAQListTableDataColumnType) => `${row.Order}`,
      cell: (row: FAQListTableDataColumnType) => (
        <FAQListTableFAQOrder order={row.Order} />
      ),
      sortable: true,
      grow: 0,
    },
    {
      name: t("Question"),
      selector: (row: FAQListTableDataColumnType) => `${row.Question}`,
      cell: (row: FAQListTableDataColumnType) => (
        <FAQListTableFAQName name={row.Question} />
      ),
      sortable: true,
      grow: 1,
    },
    {
      name: t("Answer"),
      selector: (row: FAQListTableDataColumnType) => `${row.Answer}`,
      cell: (row: FAQListTableDataColumnType) => (
        <FAQListTableFAQName name={row.Answer} />
      ),
      sortable: true,
      grow: 2,
    },
  ];
};
