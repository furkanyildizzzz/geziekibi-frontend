import { Col, TabContent, TabPane } from "reactstrap";
import TourOne from "./TourOne";
import TourTwo from "./TourTwo";
import TourThree from "./TourThree";
import TourFour from "./TourFour2";
import TourFive from "./TourFive";
import CommonButton from "../CommonButton/CommonButton";
import { useAppSelector } from "@/Redux/Hooks";
import TourSix from "./TourSix";
import TourSeven from "./TourSeven";

const TourTabContent = () => {
  const { navId } = useAppSelector((state) => state.addProduct);

  return (
    <>
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
        <TabPane tabId={7}>
          <TourSeven />
        </TabPane>
      </TabContent>
      <CommonButton />
    </>
  );
};

export default TourTabContent;
