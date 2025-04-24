import { Col, Row } from "reactstrap";
import TourLeftSidebar from "./TourLeftSidebar/TourLeftSidebar";
import TourTabContent from "./TourTabContent/TourTabContent";

const TourBody = () => {
  return (
    <Row className="g-xl-5 g-3">
      <Col
        xxl="3"
        xl="4"
        className="box-col-4e sidebar-left-wrapper mb-2 add-product-tab"
      >
        <TourLeftSidebar />
      </Col>
      <Col xxl="9" xl="8" className="box-col-8 position-relative">
        <TourTabContent />
      </Col>
    </Row>
  );
};

export default TourBody;
