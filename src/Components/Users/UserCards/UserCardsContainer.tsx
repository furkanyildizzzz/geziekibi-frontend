'use client'
import { Container, Row } from "reactstrap";
import { Users, UserCards } from "@/Constant/constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumb";
import AllCards from "./AllCards";

const UserCardsContainer = () => {
  return (
    <>
    <Breadcrumbs pageTitle={UserCards} parent={Users} title={UserCards} />
    <Container fluid>
      <Row>
        <AllCards />
      </Row>
    </Container>
    </>
    
  );
};

export default UserCardsContainer;
