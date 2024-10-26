"use client";
import {
  DeleteSelectDataButton,
  General,
  SearchTableButton,
  TagList,
} from "@/Constant/constant";
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
import Breadcrumbs from "@/CommonComponent/Breadcrumb";
import CreateNewTag from "./CreateNewTag";
import { TagSuccessResponse } from "@/Types/ApiResponseType";
import { getTagList } from "@/app/api/tag/getTagList";
import { TagListTableDataColumn } from "@/Types/TagType";
import { deleteTag, deleteTags } from "@/app/actions/tag/deleteTag";
import EditTagModal from "./EditTagModal";
import { editTag } from "@/app/actions/tag/editTag";
import { getTagById } from "@/app/actions/tag/getTagById";
import { useRouter } from "next/navigation";

const TagListContainer = () => {
  const [tagList, setTagList] = useState<TagSuccessResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagSuccessResponse | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async () => {
    const response = await getTagList();
    if ("errorMessage" in response) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage("");
      setTagList(response.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = tagList
    .filter((item) => {
      return Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    })
    .sort((a, b) => {
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

      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r: TagSuccessResponse) => r.name
          )} ?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        // setTagList(
        //   tagList.filter((item: TagSuccessResponse) =>
        //     selectedRows.filter((elem: TagSuccessResponse) => elem.id === item.id)
        //       .length > 0
        //       ? false
        //       : true
        //   )
        // );
        const ids = selectedRows.map((item: TagSuccessResponse) => item.id);
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

  const handleEdit = async (id: number) => {
    const response = await getTagById(id);
    if ("errorMessage" in response) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage("");
      setSelectedTag(response.data);
      setIsEditModalOpen(true);
    }
  };

  const handleSave = async (id: number, data: FormData) => {
    try {
      // Call your update API
      await editTag(id, data);
      await fetchData(); // Reload the tag list
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update tag:", error);
    }
  };
  return (
    <>
      <Breadcrumbs pageTitle={TagList} parent={General} title={TagList} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="list-product-header">
                  <CreateNewTag reload={fetchData} />
                </div>
                <div className="list-product">
                  <div className="table-responsive">
                    {selectedRows.length !== 0 && (
                      <Button
                        color="secondary"
                        onClick={handleMultipleDelete}
                        className="mb-3"
                      >
                        {DeleteSelectDataButton}
                      </Button>
                    )}
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={TagListTableDataColumn(handleEdit, handleDelete)}
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
                    />
                    {/* Edit Modal */}
                    <EditTagModal
                      isOpen={isEditModalOpen}
                      tag={selectedTag}
                      onClose={() => setIsEditModalOpen(false)}
                      onSave={handleSave}
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

export default TagListContainer;
