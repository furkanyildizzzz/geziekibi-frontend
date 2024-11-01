"use client";
import Breadcrumbs from "@/CommonComponent/Breadcrumb";
import {
  DashboardTitle,
  DefaultDashboardTitle,
  DefaultTitle,
} from "@/Constant/constant";
import React from "react";
import { Container, Row } from "reactstrap";
import { LeftBackground } from "./LeftSection/LeftSection";
import { CloudLightning } from "react-feather";
//import { RightBackground } from "./RightSection/RightSection";

const DefaultDashboardContainer = () => {
  return (
    <>
      <button
        onClick={async () => {
          let resp = await fetch("/api/ekim");

          console.log(await resp.json());
        }}
      >
        test
      </button>
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
