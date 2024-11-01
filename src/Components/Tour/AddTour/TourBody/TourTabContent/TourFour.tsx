import { Col, Form, Input, Label, Row } from "reactstrap";
import { ChooseYourCurrency, SellingPrice } from "@/Constant/constant";
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";

const TourFour = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="sidebar-body">
      <Form className="price-wrapper">
        <Row className="g-3 custom-input">
          <Col sm="6">
            <Label check>
              {SellingPrice} <span className="txt-danger">*</span>
            </Label>
            <Input
              type="number"
              name="initialPrice"
              onChange={(e) =>
                dispatch(
                  setFormValue({ name: "initialPrice", value: e.target.value })
                )
              }
            />
          </Col>
          <Col sm="6">
            <Label check>{ChooseYourCurrency}</Label>
            <Input
              type="select"
              defaultValue={"TL ₺"}
              name="currency"
              onChange={(e) =>
                dispatch(
                  setFormValue({ name: "currency", value: e.target.value })
                )
              }
            >
              <option>TL ₺</option>
              <option>Dollar $</option>
              <option>Euro €</option>
            </Input>
          </Col>
          {/* <TypesOfProduct /> */}
        </Row>
      </Form>
    </div>
  );
};

export default TourFour;
