import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import {
  ChooseServices,
  CreateNewServiceHeading,
  ExcludedServices,
  IncludedServices,
} from "@/Constant/constant";
import { useCallback, useEffect, useState } from "react";
import {
  ApiResponse,
  ServiceSuccessResponse,
  TourService,
} from "@/Types/ApiResponseType";
import { getServiceList } from "@/app/actions/tour/service/getServiceList";
import ThreeChoiceSwitch from "./ThreeChoiceSwitch";
import VariationCheckboxUpgrade from "./VariationCheckboxUpgrade";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { usePathname, useRouter } from "next/navigation";

const VariationCheckbox = () => {
  const [services, setServices] = useState<ServiceSuccessResponse[]>([]);
  const [service, setService] = useState<ServiceSuccessResponse>();
  const [refreshKey, setRefreshKey] = useState(0); // This will be updated to trigger rerender
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.addProduct);
  const router = useRouter();
  const pathname = usePathname();

  const fetchServiceList = useCallback(async () => {
    const response: ApiResponse<ServiceSuccessResponse[]> =
      await getServiceList();
    if ("data" in response) {
      setServices((previousServices) => {
        return response.data.map((item) => {
          const comingService = formValue.tourServices.find(
            (s: TourService) => s.service?.id === item.id
          );
          if (comingService) {
            return {
              ...comingService.service,
              selected: comingService.type === "included" ? "Y" : "N",
            };
          } else {
            return { ...item, selected: "I" };
          }
        });
      });
    }
  }, [formValue]);

  const handleModalClosed = async () => {
    const response: ApiResponse<ServiceSuccessResponse[]> =
      await getServiceList();
    if ("data" in response) {
      setServices((prevServices) => {
        // Create a map of previous services by ID
        const prevServicesMap: Record<number, ServiceSuccessResponse> =
          prevServices.reduce((map, service) => {
            map[service.id] = service;
            return map;
          }, {} as Record<number, ServiceSuccessResponse>);

        // Merge new data with old data, preserving specific properties
        const updatedServices = response.data.map((newService) => {
          const prevService = prevServicesMap[newService.id];
          if (prevService) {
            return {
              ...newService,
              selected: prevService.selected, // Preserve `selected` from the previous item
            };
          }
          return newService;
        });

        return updatedServices;
      });
    }
  };

  const handleServiceChange = (
    selected: "N" | "I" | "Y",
    id: number,
    name: string
  ) => {
    setService((prev) => {
      return { id: Number(id), name, selected } as ServiceSuccessResponse;
    });
  };

  useEffect(() => {
    fetchServiceList();
  }, [fetchServiceList]);

  useEffect(() => {
    // Check if we are no longer on the modal path to refresh the component
    if (pathname !== "/services/add-service") {
      setRefreshKey((prev) => prev + 1);
      handleModalClosed();
    }
  }, [pathname]);

  useEffect(() => {
    if (!service) return;

    setServices((prevServices) => {
      // If the service exists, update the selection status, otherwise add it
      const updatedServices = prevServices.map((item) => {
        const isMatch = item.id === service.id;
        return isMatch ? { ...item, selected: service.selected } : item;
      });
      dispatch(setFormValue({ name: "tourServices", value: updatedServices }));
      return [...updatedServices];
    });
  }, [service]);

  const handleAdd = () => {
    router.push("/services/add-service");
  };
  return (
    <Col sm="12">
      <Card>
        <CardBody>
          <Row className="g-1">
            <Col xl="12" md="12">
              <div
                key={refreshKey}
                className="tag-buton"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  color="transparent"
                  tag="a"
                  className="button-primary bg-light-primary font-primary"
                  onClick={handleAdd}
                >
                  <i className="me-2 fa fa-plus"> </i>
                  {CreateNewServiceHeading}
                </Button>
              </div>
              <h6 className="sub-title">{ChooseServices}</h6>
              <div
                className="card-wrapper border rounded-3 h-100 checkbox-checked"
                style={{
                  overflowY: "auto",
                  maxHeight: "400px",
                  marginBottom: "0",
                  paddingBottom: "0",
                }}
              >
                {services.map(({ id, name, selected }, index) => (
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
                        key={`${id}-${index}-${selected}`}
                        id={id}
                        name={name}
                        onSelectChange={handleServiceChange}
                        isSelected={selected}
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
