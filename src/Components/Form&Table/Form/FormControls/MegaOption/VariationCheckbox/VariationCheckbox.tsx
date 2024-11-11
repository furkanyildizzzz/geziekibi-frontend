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

// const VariationCheckboxEski = () => {
//   const [services, setServices] = useState<ServiceSuccessResponse[]>([]);
//   const [service, setService] = useState<ServiceSuccessResponse>();
//   const [refreshKey, setRefreshKey] = useState(0); // This will be updated to trigger rerender
//   const dispatch = useAppDispatch();
//   const { formValue } = useAppSelector((state) => state.addProduct);
//   const router = useRouter();
//   const pathname = usePathname();

//   const fetchServiceList = useCallback(async () => {
//     const response: ApiResponse<ServiceSuccessResponse[]> =
//       await getServiceList();
//     if ("data" in response) {
//       setServices((previousServices) => {
//         return response.data.map((item) => {
//           const existingService = formValue.tourServices.find(
//             (s: TourService) => s.service?.id === item.id
//           );
//           if (existingService) {
//             return {
//               ...existingService.service,
//               selected: existingService.type === "included" ? "Y" : "N",
//             };
//           } else {
//             return { ...item, selected: "I" };
//           }
//         });
//       });
//     }
//   }, [formValue]);

//   const handleModalClosed = async () => {
//     const response: ApiResponse<ServiceSuccessResponse[]> =
//       await getServiceList();
//     if ("data" in response) {
//       // Create a map of previous services by ID
//       const prevServicesMap: Record<number, ServiceSuccessResponse> =
//         services.reduce((map, service) => {
//           map[service.id] = service;
//           return map;
//         }, {} as Record<number, ServiceSuccessResponse>);

//       // Merge new data with old data, preserving specific properties
//       const updatedServices = response.data.map((newService) => {
//         const prevService = prevServicesMap[newService.id];
//         if (prevService) {
//           return {
//             ...newService,
//             selected: prevService.selected, // Preserve `selected` from the previous item
//           };
//         } else {
//           newService.selected = "I";
//           return {
//             ...newService,
//           };
//         }
//         return newService;
//       });

//       setServices([...updatedServices]);
//     }
//   };

//   const handleServiceChange = (
//     selected: "N" | "I" | "Y",
//     id: number,
//     name: string
//   ) => {
//     setService((prev) => {
//       return { id: Number(id), name, selected } as ServiceSuccessResponse;
//     });
//   };

//   useEffect(() => {
//     if (formValue.id > 0 && services.length === 0) {
//       fetchServiceList();
//     }
//   }, [fetchServiceList]);

//   useEffect(() => {
//     // Check if we are no longer on the modal path to refresh the component
//     if (pathname !== "/services/add-service") {
//       setRefreshKey((prev) => prev + 1);
//       handleModalClosed();
//     }
//   }, [pathname]);

//   useEffect(() => {
//     if (!service) return;

//     // If the service exists, update the selection status, otherwise add it
//     const updatedServices = services.map((item) => {
//       const isMatch = item.id === service.id;
//       return isMatch ? { ...item, selected: service.selected } : item;
//     });
//     setServices((prevServices) => {
//       return [...updatedServices];
//     });
//     dispatch(
//       setFormValue({ name: "tourServices", value: [...updatedServices] })
//     );
//   }, [service]);

//   const handleAdd = () => {
//     router.push("/services/add-service");
//   };
//   return (
//     <Col sm="12">
//       <Card>
//         <CardBody>
//           <Row className="g-1">
//             <Col xl="12" md="12">
//               <div
//                 key={refreshKey}
//                 className="tag-buton"
//                 style={{ display: "flex", justifyContent: "end" }}
//               >
//                 <Button
//                   color="transparent"
//                   tag="a"
//                   className="button-primary bg-light-primary font-primary"
//                   onClick={handleAdd}
//                 >
//                   <i className="me-2 fa fa-plus"> </i>
//                   {CreateNewServiceHeading}
//                 </Button>
//               </div>
//               <h6 className="sub-title">{ChooseServices}</h6>
//               <div
//                 className="card-wrapper border rounded-3 h-100 checkbox-checked"
//                 style={{
//                   overflowY: "auto",
//                   maxHeight: "400px",
//                   marginBottom: "0",
//                   paddingBottom: "0",
//                 }}
//               >
//                 {services.map(({ id, name, selected }, index) => (
//                   <div className="payment-wrapper" key={index}>
//                     <div
//                       className="payment-first"
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "15px",
//                       }}
//                     >
//                       <ThreeChoiceSwitch
//                         key={`${id}-${index}-${selected}`}
//                         id={id}
//                         name={name}
//                         onSelectChange={handleServiceChange}
//                         isSelected={selected}
//                       />
//                       <span>{name}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Col>
//             <Col xl="12" md="12">
//               <Row>
//                 <Col xl="6" md="12">
//                   <VariationCheckboxUpgrade
//                     title={IncludedServices}
//                     textColor="success"
//                     services={services.filter((s) => s.selected === "Y")}
//                   />
//                 </Col>
//                 <Col xl="6" md="12">
//                   <VariationCheckboxUpgrade
//                     title={ExcludedServices}
//                     textColor="danger"
//                     services={services.filter((s) => s.selected === "N")}
//                   />
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </CardBody>
//       </Card>
//     </Col>
//   );
// };

// const VariationCheckboxEski2 = () => {
//   const [services, setServices] = useState<ServiceSuccessResponse[]>([]);
//   const [existingServices, setExistingServices] = useState<
//     ServiceSuccessResponse[]
//   >([]);
//   const [service, setService] = useState<ServiceSuccessResponse>();
//   const [refreshKey, setRefreshKey] = useState(0); // This will be updated to trigger rerender
//   const dispatch = useAppDispatch();
//   const { formValue } = useAppSelector((state) => state.addProduct);
//   const router = useRouter();
//   const pathname = usePathname();

//   const fetchServiceList = useCallback(async () => {
//     const response: ApiResponse<ServiceSuccessResponse[]> =
//       await getServiceList();
//     if ("data" in response) {
//       setServices((previousServices) => {
//         return response.data.map((item) => {
//           const existingService = formValue.tourServices.find(
//             (s: TourService) => s.service?.id === item.id
//           );
//           if (existingService) {
//             return {
//               ...existingService.service,
//               type: existingService.type as TourServiceTypeEnum,
//             };
//           } else {
//             return { ...item, type: TourServiceTypeEnum.INHERIT };
//           }
//         });
//       });
//     }
//   }, [existingServices]);

//   const initiateExistingServices = useCallback(async () => {
//     setExistingServices([...formValue.tourServices]);
//   }, [formValue]);

//   const handleModalClosed = async () => {
//     const response: ApiResponse<ServiceSuccessResponse[]> =
//       await getServiceList();
//     if ("data" in response) {
//       // Create a map of previous services by ID
//       const prevServicesMap: Record<number, ServiceSuccessResponse> =
//         services.reduce((map, service) => {
//           map[service.id] = service;
//           return map;
//         }, {} as Record<number, ServiceSuccessResponse>);

//       // Merge new data with old data, preserving specific properties
//       const updatedServices = response.data.map((newService) => {
//         const prevService = prevServicesMap[newService.id];
//         if (prevService) {
//           return {
//             ...newService,
//             type: prevService.type, // Preserve `selected` from the previous item
//           };
//         } else {
//           newService.type = TourServiceTypeEnum.INHERIT;
//           return {
//             ...newService,
//           };
//         }
//         return newService;
//       });

//       setServices([...updatedServices]);
//     }
//   };

//   const handleServiceChange = (
//     type: TourServiceTypeEnum,
//     id: number,
//     name: string
//   ) => {
//     setService((prev) => {
//       return { id: Number(id), name, type } as ServiceSuccessResponse;
//     });
//   };

//   useEffect(() => {
//     fetchServiceList();
//   }, [fetchServiceList]);

//   useEffect(() => {
//     if (formValue.id > 0 && existingServices.length === 0) {
//       initiateExistingServices();
//     }
//   }, [initiateExistingServices]);

//   useEffect(() => {
//     // Check if we are no longer on the modal path to refresh the component
//     if (pathname !== "/services/add-service") {
//       setRefreshKey((prev) => prev + 1);
//       handleModalClosed();
//     }
//   }, [pathname]);

//   useEffect(() => {
//     if (!service) return;

//     // If the service exists, update the selection status, otherwise add it
//     const updatedServices = services.map((item) => {
//       const isMatch = item.id === service.id;
//       return isMatch ? { ...item, type: service.type } : item;
//     });
//     setServices((prevServices) => {
//       return [...updatedServices];
//     });
//     dispatch(
//       setFormValue({ name: "tourServices", value: [...updatedServices] })
//     );
//   }, [service]);

//   const handleAdd = () => {
//     router.push("/services/add-service");
//   };
//   return (
//     <Col sm="12">
//       <Card>
//         <CardBody>
//           <Row className="g-1">
//             <Col xl="12" md="12">
//               <div
//                 key={refreshKey}
//                 className="tag-buton"
//                 style={{ display: "flex", justifyContent: "end" }}
//               >
//                 <Button
//                   color="transparent"
//                   tag="a"
//                   className="button-primary bg-light-primary font-primary"
//                   onClick={handleAdd}
//                 >
//                   <i className="me-2 fa fa-plus"> </i>
//                   {CreateNewServiceHeading}
//                 </Button>
//               </div>
//               <h6 className="sub-title">{ChooseServices}</h6>
//               <div
//                 className="card-wrapper border rounded-3 h-100 checkbox-checked"
//                 style={{
//                   overflowY: "auto",
//                   maxHeight: "400px",
//                   marginBottom: "0",
//                   paddingBottom: "0",
//                 }}
//               >
//                 {services.map(({ id, name, type }, index) => (
//                   <div className="payment-wrapper" key={index}>
//                     <div
//                       className="payment-first"
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "15px",
//                       }}
//                     >
//                       <ThreeChoiceSwitch
//                         key={`${id}-${index}-${type}`}
//                         id={id}
//                         name={name}
//                         onSelectChange={handleServiceChange}
//                         type={type}
//                       />
//                       <span>{name}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Col>
//             <Col xl="12" md="12">
//               <Row>
//                 <Col xl="6" md="12">
//                   <VariationCheckboxUpgrade
//                     title={IncludedServices}
//                     textColor="success"
//                     services={services.filter(
//                       (s) => s.type === TourServiceTypeEnum.INCLUDED
//                     )}
//                   />
//                 </Col>
//                 <Col xl="6" md="12">
//                   <VariationCheckboxUpgrade
//                     title={ExcludedServices}
//                     textColor="danger"
//                     services={services.filter(
//                       (s) => s.type === TourServiceTypeEnum.EXCLUDED
//                     )}
//                   />
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </CardBody>
//       </Card>
//     </Col>
//   );
// };

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
      // // Create a map of previous services by ID
      // const prevServicesMap: Record<number, ServiceSuccessResponse> =
      //   services.reduce((map, service) => {
      //     map[service.id] = service;
      //     return map;
      //   }, {} as Record<number, ServiceSuccessResponse>);

      // // Merge new data with old data, preserving specific properties
      // const updatedServices = response.data.map((newService) => {
      //   const prevService = tourServices.find(
      //     (ts: TourServiceSuccessResponse) => ts.service.id === newService.id
      //   );
      //   return (
      //     prevService ||
      //     ({
      //       service: newService,
      //       type: TourServiceTypeEnum.INHERIT,
      //     } as TourServiceSuccessResponse)
      //   );
      // });

      // setTourServices([...updatedServices]);
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
                  disabled={isLoading}
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
                {tourServices.map(({ service: { id, name }, type }, index) => (
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
                        key={`${id}-${index}-${type}`}
                        id={id}
                        name={name}
                        onSelectChange={handleTourServiceChange}
                        type={type}
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
                    services={tourServices
                      .filter((s) => s.type === TourServiceTypeEnum.INCLUDED)
                      .map((s) => s.service)}
                  />
                </Col>
                <Col xl="6" md="12">
                  <VariationCheckboxUpgrade
                    title={ExcludedServices}
                    textColor="danger"
                    services={tourServices
                      .filter((s) => s.type === TourServiceTypeEnum.EXCLUDED)
                      .map((s) => s.service)}
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
