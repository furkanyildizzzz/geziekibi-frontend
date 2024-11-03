"use client";
import { getServiceList } from "@/app/actions/tour/service/getServiceList";
import { deleteTourCategory } from "@/app/actions/tour/category/deleteTourCategory";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import Breadcrumbs from "@/CommonComponent/Breadcrumb";
import {
  General,
  CategoryList,
  Tour,
  CreateNewCategoryHeading,
  SearchTableButton,
  ServiceList,
  Service,
  CreateNewServiceHeading,
  DeleteSelectDataButton,
} from "@/Constant/constant";
import {
  ServiceSuccessResponse,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { ServiceListTableDataColumn } from "@/Types/ServiceType";
import { TourCategoryListTableDataColumn } from "@/Types/TourCategoryType";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import {
  deleteService,
  deleteServices,
} from "@/app/actions/tour/service/deleteService";

const ServiceListContainer = () => {
  const [serviceList, setServiceList] = useState<ServiceSuccessResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [filterText, setFilterText] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const fetchData = async () => {
    const response = await getServiceList();
    if ("errorMessage" in response) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage("");
      setServiceList(response.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pathname]);

  const filteredItems = serviceList
    .filter((item) => {
      return Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    })
    .sort((a, b) => {
      return b.id - a.id;
    });

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="dataTables_filter d-flex align-items-center">
        <Label className="me-2">{SearchTableButton}:</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilterText(e.target.value)
          }
          type="search"
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  const handleEdit = async (id: number) => {
    router.push(`/services/${id}`);
  };

  const handleAdd = () => {
    router.push("/services/add-service");
  };

  const handleRowSelected = useCallback((state: any) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = async (name: string, id: number) => {
    try {
      setIsLoading(true);

      if (window.confirm(`Are you sure you want to delete:\r ${name} ?`)) {
        await deleteService(id);
        await fetchData();
      }
    } catch (error) {
      setErrorMessage("Failed to delete services. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleMultipleDelete = async () => {
    try {
      setIsLoading(true);

      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r: ServiceSuccessResponse) => r.name
          )} ?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        const ids = selectedRows.map((item: ServiceSuccessResponse) => item.id);
        await deleteServices(ids);
        await fetchData();
        setSelectedRows("");
      }
    } catch (error) {
      setErrorMessage("Failed to delete tags. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Breadcrumbs
        pageTitle={ServiceList}
        parent={Service}
        title={ServiceList}
      />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="list-product-header">
                  <div className="tag-buton">
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
                </div>
                <div className="list-product">
                  <div className="table-responsive">
                    {selectedRows.length !== 0 && (
                      <Button
                        color="secondary"
                        onClick={handleMultipleDelete}
                        className="mb-3"
                      >
                        {DeleteSelectDataButton}
                      </Button>
                    )}
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={ServiceListTableDataColumn(
                        handleEdit,
                        handleDelete
                      )}
                      striped
                      highlightOnHover
                      selectableRows
                      onSelectedRowsChange={handleRowSelected}
                      clearSelectedRows={toggleCleared}
                      pagination
                      subHeader
                      progressPending={isLoading}
                      subHeaderComponent={subHeaderComponentMemo}
                      subHeaderAlign={Alignment.LEFT}
                      onRowDoubleClicked={(row) => handleEdit(row.id)}
                      dense
                      pointerOnHover
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServiceListContainer;
