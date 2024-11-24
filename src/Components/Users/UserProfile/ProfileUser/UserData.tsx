import { ImagePath } from "@/Constant/constant";
import { Card, Col } from "reactstrap";
import FollowSection from "./FollowSection";
import { InfoSection } from "./InfoSection";
import UserSocialMedia from "./UserSocialMedia";

const UserData = () => {
  return (
    <Col sm="12">
      <Card className="hovercard text-center">
        <div className="cardheader"></div>
        <div className="user-image">
          <div className="avatar">
            <picture><img alt="" src={`${ImagePath}/user/7.jpg`} /></picture>
          </div>
          <div className="icon-wrapper">
            <i className="icofont icofont-pencil-alt-5"></i>
          </div>
        </div>
        <div className="info">
          <InfoSection />
          <hr/>
          <UserSocialMedia />
          <FollowSection />
        </div>
      </Card>
    </Col>
  )
};

export default UserData;
