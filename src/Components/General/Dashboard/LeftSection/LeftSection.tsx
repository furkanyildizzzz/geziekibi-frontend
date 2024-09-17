import React from "react";
import {Row, Col} from "reactstrap";
import WelcomeCard from "./WelcomeCard"

export const LeftBackground = () => {
    return (
      <Col xxl="4" className="col-xl-100 box-col-12 ps-4 pe-4 left-background">
        <Row className="bg-light h-100 p-3 pt-4 pb-4">
          <WelcomeCard />
          <Col xs="12" className="box-col-6 col-xl-50">
          </Col>
        </Row>
      </Col>
    );
  };
