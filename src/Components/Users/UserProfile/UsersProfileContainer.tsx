'use client'
import React from "react";
import { Container, Row } from "reactstrap";
import UserData from "./ProfileUser/UserData";
import FirstData from "./FirstData";
import SecondData from "./SecondData";
import ThirdData from "./ThirdData";
import ForthData from "./ForthData";
import { UserProfile, Users } from "@/Constant/constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumb";

const UsersProfileContainer = () => {
  return (
    <>
      <Breadcrumbs pageTitle={UserProfile} parent={Users} title={UserProfile} />
      <Container fluid>
        <div className="user-profile">
          <Row>
            <UserData />
            <FirstData />
            <SecondData />
            <ThirdData />
            <ForthData />
          </Row>
        </div>
      </Container>
    </>    
  );
};

export default UsersProfileContainer;
