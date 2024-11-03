import { Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap";
import {
  ChooseServices,
  ExcludedServices,
  IncludedServices,
} from "@/Constant/constant";
import { useEffect, useState } from "react";
import { ApiResponse, ServiceSuccessResponse } from "@/Types/ApiResponseType";
import { getServiceList } from "@/app/actions/tour/service/getServiceList";
import ThreeChoiceSwitch from "./ThreeChoiceSwitch";
import VariationCheckboxUpgrade from "./VariationCheckboxUpgrade";
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";

const VariationCheckbox = () => {
  const [services, setServices] = useState<ServiceSuccessResponse[]>([]);
  const [service, setService] = useState<ServiceSuccessResponse>();
  const dispatch = useAppDispatch();

  const fetchServiceList = async () => {
    const response: ApiResponse<ServiceSuccessResponse[]> =
      await getServiceList();
    if ("data" in response) {
      setServices(
        response.data.map((item) => {
          return { ...item, selected: "I" };
        })
      );
    }
  };

  const handleServiceChange = (
    selected: "N" | "I" | "Y",
    id: number,
    name: string
  ) => {
    // setServices((prevServices) => {
    //   // Check if the service already exists in the array
    //   const serviceExists = prevServices.some((service) => service.id === id);
    //   // If the service exists, update the selection status, otherwise add it
    //   const updatedServices = serviceExists
    //     ? prevServices.map((service) =>
    //         service.id === id
    //           ? ({ ...service, selected } as ServiceSuccessResponse)
    //           : service
    //       )
    //     : [...prevServices, { id, name, selected } as ServiceSuccessResponse];
    //   return updatedServices;
    // });
    console.log({ service });
    setService((prev) => {
      return { id: Number(id), name, selected } as ServiceSuccessResponse;
    });
  };

  useEffect(() => {
    fetchServiceList();
  }, []);

  useEffect(() => {
    if (!service) return;
    // dispatch(setFormValue({ name: "services", value: services }));
    console.log("Service Selected Value:", service.selected);
    setServices((prevServices) => {
      // If the service exists, update the selection status, otherwise add it
      const updatedServices = prevServices.map((item) => {
        const isMatch = item.id === service.id;
        console.log(`Checking ${item.id} === ${service.id}: ${isMatch}`);
        return isMatch ? { ...item, selected: service.selected } : item;
      });
      console.log("Prev services:", prevServices);
      console.log("Updated services:", updatedServices);
      dispatch(setFormValue({ name: "services", value: updatedServices }));

      return [...updatedServices];
    });
  }, [service]);

  return (
    <Col sm="12">
      <Card>
        <CardBody>
          <Row className="g-1">
            <Col xl="12" md="12">
              <h6 className="sub-title">{ChooseServices}</h6>
              <ThreeChoiceSwitch
                key={-1}
                id={-1}
                name=""
                onSelectChange={null}
              ></ThreeChoiceSwitch>
              <div
                className="card-wrapper border rounded-3 h-100 checkbox-checked"
                style={{
                  overflowY: "auto",
                  maxHeight: "400px",
                  marginBottom: "0",
                  paddingBottom: "0",
                }}
              >
                {services.map(({ id, name }, index) => (
                  <div className="payment-wrapper" key={index}>
                    <div
                      className="payment-first"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <ThreeChoiceSwitch
                        key={id}
                        id={id}
                        name={name}
                        onSelectChange={handleServiceChange}
                      />
                      <span>{name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col xl="12" md="12">
              <Row>
                <Col xl="6" md="12">
                  <VariationCheckboxUpgrade
                    title={IncludedServices}
                    textColor="success"
                    services={services.filter((s) => s.selected === "Y")}
                  />
                </Col>
                <Col xl="6" md="12">
                  <VariationCheckboxUpgrade
                    title={ExcludedServices}
                    textColor="danger"
                    services={services.filter((s) => s.selected === "N")}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default VariationCheckbox;
