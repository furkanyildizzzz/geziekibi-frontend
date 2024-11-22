"use client";
import {
  DashboardTitle,
  DefaultDashboardTitle,
  DefaultTitle,
} from "@/Constant/constant";
import React from "react";
import { Container, Row } from "reactstrap";
import { LeftBackground } from "./LeftSection/LeftSection";
import { CloudLightning } from "react-feather";
import Breadcrumbs from "@/Components/Breadcrumb";
//import { RightBackground } from "./RightSection/RightSection";

const DefaultDashboardContainer = () => {
  return (
    <>
      <Breadcrumbs
        pageTitle={DefaultDashboardTitle}
        parent={DashboardTitle}
        title={DefaultTitle}
      />
      <Container className="default-dashboard" fluid>
        <Row>
          <LeftBackground />
        </Row>
      </Container>
    </>
  );
};

export default DefaultDashboardContainer;
