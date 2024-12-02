import { Col, TabContent, TabPane } from "reactstrap";
import TourOne from "./TourOne";
import TourTwo from "./TourTwo";
import TourThree from "./TourThree";
import TourFour from "./TourFour2";
import TourFive from "./TourFive";
import CommonButton from "../CommonButton/CommonButton";
import { useAppSelector } from "@/Redux/Hooks";
import TourSix from "./TourSix";

const TourTabContent = () => {
  const { navId } = useAppSelector((state) => state.addProduct);

  return (
    <>
      <Col xxl="9" xl="8" className="box-col-8 position-relative">
        <TabContent activeTab={navId}>
          <TabPane tabId={1}>
            <TourThree />
            <hr />
            <TourOne />
          </TabPane>
          <TabPane tabId={2}>
            <TourTwo />
          </TabPane>
          <TabPane tabId={3}>
            <TourSix />
          </TabPane>
          <TabPane tabId={4}>
            <TourFour />
          </TabPane>
          {/* <TabPane tabId={5}>
            <TourFour />
          </TabPane> */}
          <TabPane tabId={6}>
            <TourFive />
          </TabPane>
        </TabContent>
      </Col>
      <CommonButton />
    </>
  );
};

export default TourTabContent;
