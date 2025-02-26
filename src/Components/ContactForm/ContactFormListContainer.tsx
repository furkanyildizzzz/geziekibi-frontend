"use client";
import { SearchTableButton } from "@/Constant/constant";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ContactFormSuccessResponse } from "@/Types/ApiResponseType";
import { TagListTableDataColumn } from "@/Types/TagType";
import { deleteTag, deleteTags } from "@/app/actions/tag/deleteTag";
import { editTag } from "@/app/actions/tag/editTag";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../Breadcrumb";
import { getContactFormList } from "@/app/actions/contactForm/getContactFormList";
import { ContactFormListTableDataColumn } from "@/Types/ContactFormType";

const ContactFormListContainer = () => {
  const [ContactFormList, setContactFormList] = useState<
    ContactFormSuccessResponse[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedTag, setSelectedTag] =
    useState<ContactFormSuccessResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation("common");

  const fetchData = async () => {
    const response = await getContactFormList();
    if ("errorMessage" in response) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage("");
      setContactFormList(response.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pathname]);

  const filteredItems = ContactFormList.filter((item) => {
    return Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  }).sort((a, b) => {
    return b.id - a.id;
  });

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="dataTables_filter d-flex align-items-center">
        <Label className="me-2">{SearchTableButton}:</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilterText(e.target.value)
          }
          type="search"
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  const handleRowSelected = useCallback((state: any) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = async (name: string, id: number) => {
    try {
      setIsLoading(true);

      if (window.confirm(`Are you sure you want to delete:\r ${name} ?`)) {
        setToggleCleared(!toggleCleared);
        await deleteTag(id);

        await fetchData();
        setSelectedRows("");
      }
    } catch (error) {
      setErrorMessage("Failed to delete tags. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleMultipleDelete = async () => {
    try {
      setIsLoading(true);

      if (window.confirm(`Are you sure you want to delete: ?`)) {
        setToggleCleared(!toggleCleared);

        const ids = selectedRows.map(
          (item: ContactFormSuccessResponse) => item.id
        );
        await deleteTags(ids);
        await fetchData();
        setSelectedRows("");
      }
    } catch (error) {
      setErrorMessage("Failed to delete tags. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleSendMessage = async (id: number) => {
    router.push(`/contact-forms/${id}`);
  };

  const handleSave = async (id: number, data: FormData) => {
    try {
      // Call your update API
      await editTag(id, data);
      await fetchData(); // Reload the tag list
      // setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update tag:", error);
    }
  };
  return (
    <>
      <Breadcrumbs
        pageTitle={t("Contact Form List")}
        parent={t("General")}
        title={t("Contact Form List")}
      />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="list-product">
                  <div className="table-responsive">
                    {selectedRows.length !== 0 && (
                      <Button
                        color="danger"
                        onClick={handleMultipleDelete}
                        className="mb-3"
                      >
                        {t("DeleteSelectDataButton")}
                      </Button>
                    )}
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={ContactFormListTableDataColumn(
                        handleSendMessage,
                        handleDelete
                      )}
                      striped
                      highlightOnHover
                      selectableRows
                      onSelectedRowsChange={handleRowSelected}
                      clearSelectedRows={toggleCleared}
                      pagination
                      subHeader
                      progressPending={isLoading}
                      subHeaderComponent={subHeaderComponentMemo}
                      subHeaderAlign={Alignment.LEFT}
                      onRowDoubleClicked={(row) => handleSendMessage(row.id)}
                      dense
                      pointerOnHover
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactFormListContainer;
