import { Col, Form, Input, Label, Row } from "reactstrap";
import { ChooseYourCurrency, SellingPrice } from "@/Constant/constant";
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";

export const DropDownData = [
  { id: "1", name: "TL ₺", header: true },
  { id: "2", name: "Dolar $" },
  { id: "3", name: "Euro €" },
];

const TourFour = () => {
  const dispatch = useAppDispatch();

  const handleCurrencyIdChanged = (id: string) => {
    dispatch(setFormValue({ name: "currency", value: Number(id) }));
  };

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
            <DropDownComponent
              id="id"
              title={ChooseYourCurrency}
              isRequired={false}
              labelKey="name"
              multiple={false}
              placeHolder=""
              onChange={handleCurrencyIdChanged}
              options={DropDownData.map((item) => {
                return {
                  name: item.name,
                  id: item.id.toString(),
                };
              })}
              selectedOption={[{ ...DropDownData[0] }]}
            />

            {/* <Input
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
            </Input> */}
          </Col>
          {/* <TypesOfProduct /> */}
        </Row>
      </Form>
    </div>
  );
};

export default TourFour;
