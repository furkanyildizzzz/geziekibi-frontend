import { Button, Card, CardBody, Col } from "reactstrap";
import SweetAlert from "sweetalert2";
import {
  SuccessMessages,
  LoginSuccessfully,
  ThemePrimary,
} from "@/Constant/constant";
import { CommonCardHeader } from "@/Components/General/Widgets/Common/CommonCardHeader";

const SuccessMessage = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      icon: "success",
      title: "Good job!",
      text: "You clicked the button!",
      confirmButtonColor: ThemePrimary,
    });
  };

  return (
    <Col xxl="3" lg="4" sm="6" xs="12">
      <Card className="height-equal">
        <CommonCardHeader
          title={SuccessMessages}
          //subTitle={SuccessMassageData}
        />
        <CardBody className="btn-showcase">
          <Button color="success" className="sweet-8" onClick={displayAlert}>
            {LoginSuccessfully}
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SuccessMessage;
