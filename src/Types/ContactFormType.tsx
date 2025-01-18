import SVG from "@/Components/SVG/Svg";
import { useTranslation } from "react-i18next";

export interface ContactFormTableDataColumnType {
  id: number;
  firstName: string;
  lastName: string;
}

export interface ContactFormListTableDataColumnType {
  id: number;
  firstName: string;
  lastName: string;
  message: string;
  email: string;
  phone?: string;
  isResponded: boolean;
  response?: string;
}

export interface ContactFormListTableContactForm {
  firstName?: string;
  lastName?: string;
}

const ContactFormListTableContactFormName: React.FC<
  ContactFormListTableContactForm
> = ({ firstName }) => {
  return (
    <div className="product-names my-2">
      <p>{firstName}</p>
    </div>
  );
};

const ContactFormListTableAction = (props: {
  name: string;
  isResponded: boolean;
  id: number;
  sendMessage: (id: number) => Promise<void>;
  handleDelete: (name: string, id: number) => Promise<void>;
}) => {
  const { name, id, isResponded, sendMessage, handleDelete } = props;
  return (
    <div className="product-action">
      <SVG
        iconId={isResponded ? "fill-message" : "message"}
        onClick={() => sendMessage(id)}
      />
      <SVG onClick={async () => await handleDelete(name, id)} iconId="trash1" />
    </div>
  );
};

export const ContactFormListTableDataColumn = (
  sendMessageHandler: (id: number) => Promise<void>,
  deleteHandler: (name: string, id: number) => Promise<void>
) => {
  const { t } = useTranslation("common");

  return [
    {
      name: t("Actions"),
      cell: (row: ContactFormListTableDataColumnType) => (
        <ContactFormListTableAction
          name={row.firstName}
          id={row.id}
          isResponded={row.isResponded}
          sendMessage={sendMessageHandler}
          handleDelete={deleteHandler}
        />
      ),
      grow: 0,
    },
    {
      name: t("FirstName2"),
      selector: (row: ContactFormListTableDataColumnType) => `${row.firstName}`,
      cell: (row: ContactFormListTableDataColumnType) => (
        <ContactFormListTableContactFormName firstName={row.firstName} />
      ),
      sortable: true,
      grow: 0.5,
    },
    {
      name: t("LastName2"),
      selector: (row: ContactFormListTableDataColumnType) => `${row.lastName}`,
      cell: (row: ContactFormListTableDataColumnType) => (
        <ContactFormListTableContactFormName firstName={row.lastName} />
      ),
      sortable: true,
      grow: 0.5,
    },
    {
      name: t("Message"),
      selector: (row: ContactFormListTableDataColumnType) => `${row.message}`,
      cell: (row: ContactFormListTableDataColumnType) => (
        <ContactFormListTableContactFormName firstName={row.message} />
      ),
      sortable: true,
      grow: 2,
    },
    {
      name: t("Email"),
      selector: (row: ContactFormListTableDataColumnType) => `${row.email}`,
      cell: (row: ContactFormListTableDataColumnType) => (
        <ContactFormListTableContactFormName firstName={row.email} />
      ),
      sortable: true,
      grow: 1,
    },
    {
      name: t("Phone"),
      selector: (row: ContactFormListTableDataColumnType) => `${row.phone}`,
      cell: (row: ContactFormListTableDataColumnType) => (
        <ContactFormListTableContactFormName firstName={row.phone} />
      ),
      sortable: true,
      grow: 1,
    },
    {
      name: t("Response"),
      selector: (row: ContactFormListTableDataColumnType) => `${row.response}`,
      cell: (row: ContactFormListTableDataColumnType) => (
        <ContactFormListTableContactFormName firstName={row.response} />
      ),
      sortable: true,
      grow: 2,
    },
  ];
};
