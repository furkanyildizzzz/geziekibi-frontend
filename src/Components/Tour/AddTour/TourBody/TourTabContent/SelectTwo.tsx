import { Col, Label, Row } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { AddTag } from "@/Constant/constant";

export const MultiWithHeaderData = [
  { name: "NBA Teams", header: true },
  { name: "Boston Celtics" },
  { name: "Dallas Mavericks" },
  { name: "Brooklyn Nets" },
  { name: "Houston Rockets" },
  { name: "New York Knicks" },
  { name: "Memphis Grizzlies" },
  { name: "Philadelphia 76ers" },
  { name: "New Orleans Hornets" },
  { name: "Toronto Raptors" },
  { name: "San Antonio Spurs" },
  { name: "Chicago Bulls" },
  { name: "Denver Nuggets" },
  { name: "Cleveland Cavaliers" },
  { name: "Minnesota Timberwolves" },
  { name: "Detroit Pistons" },
  { name: "Portland Trail Blazers" },
  { name: "Indiana Pacers" },
  { name: "Oklahoma City Thunder" },
  { name: "Milwaukee Bucks" },
  { name: "Utah Jazz" },
  { name: "Atlanta Hawks" },
  { name: "Golden State Warriors" },
  { name: "Charlotte Bobcats" },
  { name: "Los Angeles Clippers" },
  { name: "Miami Heat" },
  { name: "Los Angeles Lakers" },
  { name: "Orlando Magic" },
  { name: "Phoenix Suns" },
  { name: "Washington Wizards" },
  { name: "Sacramento King" },
  { name: "", divider: true },
  { name: "NHL Teams", header: true },
  { name: "Boston Celtics" },
  { name: "Dallas Mavericks" },
  { name: "Brooklyn Nets" },
  { name: "Houston Rockets" },
  { name: "New York Knicks" },
  { name: "Memphis Grizzlies" },
  { name: "Philadelphia 76ers" },
  { name: "New Orleans Hornets" },
  { name: "Toronto Raptors" },
  { name: "San Antonio Spurs" },
  { name: "Chicago Bulls" },
  { name: "Denver Nuggets" },
  { name: "Cleveland Cavaliers" },
  { name: "Minnesota Timberwolves" },
  { name: "Detroit Pistons" },
  { name: "Portland Trail Blazers" },
  { name: "Indiana Pacers" },
  { name: "Oklahoma City Thunder" },
  { name: "Milwaukee Bucks" },
  { name: "Utah Jazz" },
  { name: "Atlanta Hawks" },
  { name: "Golden State Warriors" },
  { name: "Charlotte Bobcats" },
  { name: "Los Angeles Clippers" },
  { name: "Miami Heat" },
  { name: "Los Angeles Lakers" },
  { name: "Orlando Magic" },
  { name: "Phoenix Suns" },
  { name: "Washington Wizards" },
  { name: "Sacramento King" },
];

const SelectTwo = () => {
  return (
    <Col sm="6">
      <Row className="g-2 product-tag">
        <Col xs="12">
          <Label className="d-block m-0" for="validationServer01" check>
            {AddTag}
            <span className="txt-danger"> *</span>
          </Label>
        </Col>
        <Col xs="12">
          <Typeahead
            id="multiple-typeahead"
            labelKey="name"
            multiple
            options={MultiWithHeaderData}
          />
          <p className="f-light">Products can be tagged</p>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectTwo;
