"use client";
import { General, SearchTableButton, TagList } from "@/Constant/constant";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumb";
import CreateNewTag from "./CreateNewTag";
import { TagSuccessResponse } from "@/Types/ApiResponseType";
import { getTagList } from "@/app/actions/tag/getTagList";
import { TagListTableDataColumn } from "@/Types/TagType";

export const TagListContainer = () => {
  const [tagList, setTagList] = useState<TagSuccessResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTagList();
      if ("errorMessage" in response) {
        setErrorMessage(response.errorMessage);
      } else {
        setErrorMessage("");
        setTagList(response.data);
      }
    };
    fetchData();
  }, []);

  const [filterText, setFilterText] = useState("");
  const filteredItems = tagList.filter((item) => {
    return Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(filterText.toLowerCase())
    );
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

  return (
    <>
      <Breadcrumbs pageTitle={TagList} parent={General} title={TagList} />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="list-product-header">
                  <CreateNewTag />
                </div>
                <div className="list-product">
                  <div className="table-responsive">
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={TagListTableDataColumn}
                      striped
                      highlightOnHover
                      pagination
                      selectableRows
                      subHeader
                      subHeaderComponent={subHeaderComponentMemo}
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
