"use client"
import Breadcrumbs from "@/CommonComponent/Breadcrumb";
import { DashboardTitle, DefaultDashboardTitle, DefaultTitle } from "@/Constant/constant";
import React from "react";
import {Container, Row} from "reactstrap";
import { LeftBackground } from "./LeftSection/LeftSection";
//import { RightBackground } from "./RightSection/RightSection";

const DefaultDashboardContainer = () => {
    return (
      <>
        <Breadcrumbs pageTitle={DefaultDashboardTitle} parent={DashboardTitle} title={DefaultTitle} />
        <Container className="default-dashboard" fluid>
          <Row>
            <LeftBackground />
          </Row>
        </Container>
      </>
    );
  };
  
  export default DefaultDashboardContainer;
