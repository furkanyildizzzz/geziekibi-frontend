"use client";
import { getServiceList } from "@/app/actions/tour/service/getServiceList";
import Breadcrumbs from "@/CommonComponent/Breadcrumb";
import {
  SearchTableButton,
  TourList,
  Tour,
  CreateNewTourHeading,
  DeleteSelectDataButton,
} from "@/Constant/constant";
import { TourSuccessResponse } from "@/Types/ApiResponseType";
import {
  TourListTableDataColumn,
  TourListTableDataColumnType,
} from "@/Types/TourType";
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
import { deleteService } from "@/app/actions/tour/service/deleteService";
import { getTourList } from "@/app/actions/tour/self/getTourList";
import { deleteTour } from "@/app/actions/tour/self/deleteTour";

const TourListContainer = () => {
  const [tourList, setTourList] = useState<TourListTableDataColumnType[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const fetchData = async () => {
    const response = await getTourList();
    if ("errorMessage" in response) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage("");
      setTourList([
        ...response.data.map((s) => {
          return {
            id: s.id,
            title: s.title,
            spot: s.spot,
            type: s.type,
            publishStatus: s.publishStatus,
            publishDate: s.publishDate,
            category: s.category?.name, //TourCategorySuccessResponse,
            prices: s.prices,
            imageUrl: s.image,
          };
        }),
      ]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pathname]);

  const filteredItems = tourList
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
    // router.push(`/tour/${id}`);
    window.open("/tour/${id}", "_blank");
  };

  const handleAdd = () => {
    // router.push("/tour/add_tour");
    window.open("/tour/add_tour", "_blank");
  };

  const handleDelete = async (title: string, id: number) => {
    try {
      setIsLoading(true);

      if (window.confirm(`Are you sure you want to delete:\r ${title} ?`)) {
        await deleteTour(id);
        await fetchData();
      }
    } catch (error) {
      setErrorMessage("Failed to delete tour. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Breadcrumbs pageTitle={TourList} parent={Tour} title={TourList} />
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
                      {CreateNewTourHeading}
                    </Button>
                  </div>
                </div>
                <div className="list-product">
                  <div className="table-responsive">
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={TourListTableDataColumn(
                        handleEdit,
                        handleDelete
                      )}
                      striped
                      highlightOnHover
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

export default TourListContainer;
