import { Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { ChooseServices } from "@/Constant/constant";
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { useEffect, useState } from "react";

export const VariationCheckboxData = [
  {
    text: "We can create any creative design by using ",
    code: "(type='checkbox')",
  },
  {
    text: "attribute.",
  },
];

export const VariationCheckboxDataList = [
  {
    id: 1,
    color: "success",
    labelText: "Reading",
  },
  {
    id: 2,
    color: "success",
    labelText: "Watching TV",
    check: true,
  },
  {
    id: 3,
    color: "danger",
    labelText: "Listening to music",
  },
  {
    id: 4,
    color: "danger",
    labelText: "Playing video games",
  },
  {
    id: 5,
    color: "success",
    labelText: "Painting/Drawing",
  },
  {
    id: 1,
    color: "success",
    labelText: "Reading",
  },
  {
    id: 2,
    color: "success",
    labelText: "Watching TV",
    check: true,
  },
  {
    id: 3,
    color: "danger",
    labelText: "Listening to music",
  },
  {
    id: 4,
    color: "danger",
    labelText: "Playing video games",
  },
  {
    id: 5,
    color: "success",
    labelText: "Painting/Drawing",
  },
  {
    id: 1,
    color: "success",
    labelText: "Reading",
  },
  {
    id: 2,
    color: "success",
    labelText: "Watching TV",
    check: true,
  },
  {
    id: 3,
    color: "danger",
    labelText: "Listening to music",
  },
  {
    id: 4,
    color: "danger",
    labelText: "Playing video games",
  },
  {
    id: 5,
    color: "success",
    labelText: "Painting/Drawing",
  },
  {
    id: 1,
    color: "success",
    labelText: "Reading",
  },
  {
    id: 2,
    color: "success",
    labelText: "Watching TV",
    check: true,
  },
  {
    id: 3,
    color: "danger",
    labelText: "Listening to music",
  },
  {
    id: 4,
    color: "danger",
    labelText: "Playing video games",
  },
  {
    id: 5,
    color: "success",
    labelText: "Painting/Drawing",
  },
];

const VariationCheckbox = () => {
  const [services, setServices] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setFormValue({
        name: "services",
        value: services,
      })
    );
  }, [services]);
  return (
    <Col sm="12">
      <Card>
        <CardBody>
          <Row className="g-3">
            <Col xl="12" md="12">
              <h6 className="sub-title">{ChooseServices}</h6>
              <div
                className="card-wrapper border rounded-3 h-100 checkbox-checked"
                style={{ overflowY: "auto", maxHeight: "400px" }}
              >
                {VariationCheckboxDataList.map(
                  ({ id, color, check, labelText }, index) => (
                    <div className="payment-wrapper" key={index}>
                      <div className="payment-first">
                        <FormGroup
                          className={`checkbox checkbox-${color}`}
                          check
                        >
                          <Input
                            id={`check-${id}`}
                            type="checkbox"
                            defaultChecked={check}
                            onChange={(e) => {
                              const { checked } = e.target;
                              console.log({ id, checked });
                              if (checked) {
                                setServices((prevItems) => [...prevItems, id]);
                              } else {
                                setServices((prevItems) =>
                                  prevItems.filter((item) => item !== id)
                                );
                              }
                            }}
                          />
                          <Label className="mb-0" htmlFor={`check-${id}`} check>
                            {labelText}
                          </Label>
                        </FormGroup>
                      </div>
                    </div>
                  )
                )}
              </div>
            </Col>
            {/* <VariationCheckboxUpgrade /> */}
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default VariationCheckbox;
