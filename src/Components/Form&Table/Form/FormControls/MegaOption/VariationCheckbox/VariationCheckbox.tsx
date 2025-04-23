import React from "react";
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
  TourServiceSuccessResponse,
  TourSuccessResponse,
} from "@/Types/ApiResponseType";
import { getServiceList } from "@/app/actions/tour/service/getServiceList";
import ThreeChoiceSwitch from "./ThreeChoiceSwitch";
import VariationCheckboxUpgrade from "./VariationCheckboxUpgrade";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { usePathname, useRouter } from "next/navigation";
import { TourServiceTypeEnum } from "@/app/lib/enums";
import { useTranslation } from "react-i18next";

const VariationCheckbox = () => {
  const [services, setServices] = useState<ServiceSuccessResponse[]>([]);
  const [tourServices, setTourServices] = useState<
    TourServiceSuccessResponse[]
  >([]);
  const [tourService, setTourService] = useState<TourServiceSuccessResponse>();
  const [refreshKey, setRefreshKey] = useState(0); // This will be updated to trigger rerender
  const dispatch = useAppDispatch();
  const { formValue, isLoading } = useAppSelector((state) => state.addProduct);
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation("common");

  // Filter services based on search query
  const filteredServices = tourServices.filter(({ service: { name } }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchServiceList2 = useCallback(async () => {
    setTourServices((previousTourServices) => {
      return services.map((s: ServiceSuccessResponse) => {
        const ts = formValue.tourServices.find(
          (ss: TourServiceSuccessResponse) => ss.service.id === s.id
        );
        if (ts) return { ...ts };
        else return { id: -1, type: TourServiceTypeEnum.INHERIT, service: s };
      });
    });
  }, [formValue, services]);

  const fetchServiceList = async () => {
    const response: ApiResponse<ServiceSuccessResponse[]> =
      await getServiceList();
    if ("data" in response) {
      setServices([...response.data]);
    }
  };

  const handleModalClosed = async () => {
    const response: ApiResponse<ServiceSuccessResponse[]> =
      await getServiceList();
    if ("data" in response) {
      setServices([...response.data]);
    }
  };

  const handleTourServiceChange = (
    type: TourServiceTypeEnum,
    id: number,
    name: string
  ) => {
    setTourService((prev) => {
      return {
        type,
        service: { id: Number(id), name },
      } as TourServiceSuccessResponse;
    });
  };

  useEffect(() => {
    fetchServiceList2();
  }, [fetchServiceList2]);

  useEffect(() => {
    fetchServiceList();
  }, [""]);

  useEffect(() => {
    if (formValue.id > 0 && tourServices.length === 0) fetchServiceList2();
  }, [fetchServiceList2]);

  useEffect(() => {
    // Check if we are no longer on the modal path to refresh the component
    if (pathname !== "/services/add-service") {
      setRefreshKey((prev) => prev + 1);
      handleModalClosed();
      fetchServiceList();
    }
  }, [pathname]);

  useEffect(() => {
    if (!tourService) return;

    // If the service exists, update the selection status, otherwise add it
    const updatedServices = tourServices.map((item) => {
      const isMatch = item.service.id === tourService.service.id;
      return isMatch ? { ...item, type: tourService.type } : item;
    });
    setTourServices((prevServices) => {
      return [...updatedServices];
    });
    dispatch(
      setFormValue({ name: "tourServices", value: [...updatedServices] })
    );
  }, [tourService]);

  const handleAdd = () => {
    router.push("/tour/services/add-service");
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
                  disabled={isLoading}
                  onClick={handleAdd}
                >
                  <i className="me-2 fa fa-plus"> </i>
                  {t("CreateNewServiceHeading")}
                </Button>
              </div>
              <h6 className="sub-title">{t("ChooseServices")}</h6>

              {/* Search Bar */}
              <div className="mb-3">
                <Input
                  type="text"
                  placeholder={t("SearchByName")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div
                className="card-wrapper border rounded-3 h-100 checkbox-checked"
                style={{
                  overflowY: "auto",
                  maxHeight: "400px",
                  marginBottom: "0",
                  paddingBottom: "0",
                }}
              >
                <div className="row">
                  {filteredServices.map(
                    ({ service: { id, name }, type }, index) => (
                      <React.Fragment key={index}>
                        <div className="col-lg-6 col-12">
                          <div className="d-flex flex-lg-row flex-column align-items-start gap-3">
                            <div style={{ flexShrink: 0 }}>
                              <ThreeChoiceSwitch
                                key={`${id}-${index}-${type}`}
                                id={id}
                                name={name}
                                onSelectChange={handleTourServiceChange}
                                type={type}
                              />
                            </div>
                            <span
                              className="w-100 text-center"
                              style={{
                                flexGrow: 1,
                                wordBreak: "break-word",
                                overflowWrap: "anywhere",
                                alignSelf: "center",
                              }}
                            >
                              {name}
                            </span>
                          </div>
                        </div>
                        {index < filteredServices.length - 1 && (
                          <div className="col-12">
                            <hr className="my-3" />
                          </div>
                        )}
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>
            </Col>
            <Col xl="12" md="12">
              <Row>
                <Col xl="6" md="12">
                  <VariationCheckboxUpgrade
                    title={t("IncludedServices")}
                    textColor="success"
                    services={tourServices
                      .filter((s) => s.type === TourServiceTypeEnum.INCLUDED)
                      .map((s) => s.service)}
                    removeItemFromList={handleTourServiceChange}
                  />
                </Col>
                <Col xl="6" md="12">
                  <VariationCheckboxUpgrade
                    title={t("ExcludedServices")}
                    textColor="danger"
                    services={tourServices
                      .filter((s) => s.type === TourServiceTypeEnum.EXCLUDED)
                      .map((s) => s.service)}
                    removeItemFromList={handleTourServiceChange}
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
