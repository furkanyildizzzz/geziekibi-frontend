"use client";
import { AppsTitle, FileManagerTitle } from "@/Constant/constant";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "@/Components/Breadcrumb";
import FileContent from "./FileContent";

const CatalogListContainer = () => {
  return (
    <>
      <Breadcrumbs
        pageTitle={FileManagerTitle}
        parent={AppsTitle}
        title={FileManagerTitle}
      />
      <Container fluid>
        <Row>
          <Col xl="12" md="12" className="box-col-12">
            <div className="file-content">
              <FileContent />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CatalogListContainer;
