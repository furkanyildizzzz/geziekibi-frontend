import { Row } from "reactstrap";
import TourLeftSidebar from "./TourLeftSidebar/TourLeftSidebar";
import TourTabContent from "./TourTabContent/TourTabContent";

const TourBody = () => {
  return (
    <Row className="g-xl-5 g-3">
      <TourLeftSidebar />
      <TourTabContent />
    </Row>
  );
};

export default TourBody;
