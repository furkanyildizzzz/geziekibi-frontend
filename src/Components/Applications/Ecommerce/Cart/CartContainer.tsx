"use client";

import { Cart, ECommerce } from "@/Constant/constant";
import React from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import { CartData } from "./CartData";
import { CommonCardHeader } from "@/Components/General/Widgets/Common/CommonCardHeader";
import Breadcrumbs from "@/Components/Breadcrumb";

const CartContainer = () => {
  return (
    <>
      <Breadcrumbs pageTitle={Cart} parent={ECommerce} title={Cart} />
      <Container fluid>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={Cart} />
            <CardBody>
              <CartData />
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default CartContainer;
