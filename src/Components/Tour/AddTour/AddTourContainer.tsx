"use client";
import React from "react";
import { AddTour, ECommerce, TourForm } from "@/Constant/constant";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import TourBody from "./TourBody/TourBody";
import Breadcrumbs from "@/CommonComponent/Breadcrumb";

const AddTourContainer = () => {
  return (
    <>
      <Breadcrumbs pageTitle={AddTour} parent={ECommerce} title={AddTour} />
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <h4>{TourForm}</h4>
              </CardHeader>
              <CardBody>
                <TourBody />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddTourContainer;
