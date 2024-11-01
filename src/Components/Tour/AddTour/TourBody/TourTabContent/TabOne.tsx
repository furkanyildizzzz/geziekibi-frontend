import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
  AllowBackOrders,
  LowStock,
  PreOrder,
  RestockDate,
  SKU,
  StockAvailability,
  StockQuantity,
} from "@/Constant/constant";
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import VariationCheckbox from "@/Components/Form&Table/Form/FormControls/MegaOption/VariationCheckbox/VariationCheckbox";

const TabOne = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="meta-body">
      <Form id="advance-tab">
        <Row className="g-3 custom-input">
          <VariationCheckbox />
        </Row>
      </Form>
    </div>
  );
};

export default TabOne;
