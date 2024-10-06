"use client";
import { UserForm } from "@/Components/Auth/UserForm";
import { UserFormSignup } from "@/Components/Auth/UserFormSignup";
import { Col, Container, Row } from "reactstrap";

const UserSignup = () => {
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card login-dark">
            <UserFormSignup />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSignup;
