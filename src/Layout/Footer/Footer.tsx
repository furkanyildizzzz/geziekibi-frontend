import SVG from "@/Components/SVG/Svg";
import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="6" className="p-0 footer-copyright">
            <p className="mb-0">Copyright 2024 © Dunzo theme by pixelstrap.</p>
          </Col>
          <Col md="6" className="p-0">
            <p className="heart mb-0">
              Hand crafted &amp; made with
              <SVG className="footer-icon ms-1" iconId="heart" />
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
