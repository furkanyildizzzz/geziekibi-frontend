import { Col, Form, Input, Label, Row } from "reactstrap";
import {
  AdditionalDescription,
  AdditionalTagTitle,
  MdeEditorText,
  SpecificTags,
} from "@/Constant/constant";
import { Typeahead } from "react-bootstrap-typeahead";
import SimpleMdeReact from "react-simplemde-editor";
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";

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

const TabTwo = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="meta-body">
      <Form>
        <Row className="g-3">
          <Col xs="12">
            <Row className="g-3">
              <Col sm="6">
                <Row className="custom-input">
                  <Col xs="12">
                    <Label>{AdditionalTagTitle}</Label>
                  </Col>
                  <Col xs="12">
                    <Input
                      type="text"
                      name="additionalTag"
                      onChange={(e) =>
                        dispatch(
                          setFormValue({
                            name: "additionalTag",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                    <p className="f-light">
                      {" "}
                      Add a new tag title. Keywords should be simple and
                      accurate.{" "}
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm="6">
                <Row className="product-tag">
                  <Col xs="12">
                    <Label>{SpecificTags}</Label>
                  </Col>
                  <Col xs="12">
                    <Typeahead
                      id="multiple-typeahead"
                      labelKey="name"
                      options={MultiWithHeaderData}
                      multiple
                      clearButton
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs="12">
                <Row>
                  <Col xs="12">
                    <Label> {AdditionalDescription} </Label>
                    <div id="editor4">
                      <SimpleMdeReact
                        id="editor_container"
                        value={MdeEditorText}
                        options={{ autofocus: false, spellChecker: true }}
                      />
                    </div>
                    <p className="f-light">
                      Enhance your SEO ranking with an added tag description for
                      the product.
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TabTwo;
