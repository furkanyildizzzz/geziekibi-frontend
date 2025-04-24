import { Col, Form, Row } from "reactstrap";
import SelectOne from "./SelectOne";
import SelectTwo from "./SelectTwo";
import CreateNewCategory from "./CreateNewCategory";
import SelectFour from "./SelectFour";
import SelectFive from "./SelectFive";
import SelectThree from "./SelectThree";

const TourThree = () => {
  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-lg-4 g-3">
          <Col lg="6" xs="12">
            <SelectOne />
          </Col>
          <Col lg="6" xs="12">
            <SelectTwo />
          </Col>
        </Row>
        <hr />
        <Row className="g-lg-4 g-3">
          <Col lg="6" xs="12">
            <SelectFour />
          </Col>
          <Col lg="6" xs="12">
            <SelectFive />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TourThree;
