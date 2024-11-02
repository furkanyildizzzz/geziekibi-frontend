import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import FormEditors from "./FormEditors";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { ProductTitle, TourSpot, TourTitle } from "@/Constant/constant";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";

const TourOne = () => {
  const { formValue } = useAppSelector((state) => state.addProduct);
  const dispatch = useAppDispatch();

  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-2">
          <FormGroup>
            <Col xs="12">
              <Label className="m-0" check>
                {TourTitle} <span className="txt-danger"> *</span>
              </Label>
            </Col>
            <Col xs="12">
              <div className="custom-input">
                <Input
                  className={formValue.title !== "" ? "valid" : "is-invalid"}
                  type="text"
                  required
                  name="title"
                  value={formValue.title}
                  onChange={(e) =>
                    dispatch(
                      setFormValue({ name: "title", value: e.target.value })
                    )
                  }
                />
              </div>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xs="12">
              <Label className="m-0" check>
                {TourSpot} <span className="txt-danger"> *</span>
              </Label>
            </Col>
            <Col xs="12">
              <div className="custom-input">
                <Input
                  className={formValue.spot !== "" ? "valid" : "is-invalid"}
                  type="textarea"
                  required
                  value={formValue.spot}
                  name="spot"
                  onChange={(e) =>
                    dispatch(
                      setFormValue({ name: "spot", value: e.target.value })
                    )
                  }
                />
              </div>
            </Col>
          </FormGroup>
          <FormGroup>
            <FormEditors />
          </FormGroup>
        </Row>
      </Form>
    </div>
  );
};

export default TourOne;
