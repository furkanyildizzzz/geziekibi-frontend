import { Col, Form, Row } from "reactstrap";
import SelectOne from "./SelectOne";
import SelectTwo from "./SelectTwo";
import CreateNewCategory from "./CreateNewCategory";
import SelectFour from "./SelectFour";
import SelectFive from "./SelectFive";

const TourThree = () => {
  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-lg-4 g-3">
          <Col xs="12">
            <Row className="g-3">
              <SelectOne />
              <SelectTwo />
            </Row>
          </Col>
          <Col xs="12">
            <Row className="g-3">
              <SelectFour />
              <SelectFive />
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TourThree;
