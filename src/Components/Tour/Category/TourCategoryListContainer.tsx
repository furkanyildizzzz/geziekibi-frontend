"use client";
import { deleteTourCategory } from "@/app/actions/tour/category/deleteTourCategory";
import { getTourCategoryList } from "@/app/actions/tour/category/getTourCategoryList";
import Breadcrumbs from "@/CommonComponent/Breadcrumb";
import {
  General,
  CategoryList,
  Tour,
  CreateNewCategoryHeading,
  SearchTableButton,
} from "@/Constant/constant";
import { TourCategorySuccessResponse } from "@/Types/ApiResponseType";
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

const TourCategoryListContainer = () => {
  const [tourCategoryList, setTourCategoryList] = useState<
    TourCategorySuccessResponse[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [filterText, setFilterText] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const fetchData = async () => {
    const response = await getTourCategoryList();
    if ("errorMessage" in response) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage("");
      setTourCategoryList(response.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pathname]);

  const filteredItems = tourCategoryList
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
    router.push(`/tour/categories/${id}`);
  };

  const handleAdd = () => {
    router.push("/tour/categories/add-category");
  };

  const handleDelete = async (name: string, id: number) => {
    try {
      setIsLoading(true);

      if (window.confirm(`Are you sure you want to delete:\r ${name} ?`)) {
        await deleteTourCategory(id);
        await fetchData();
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
        pageTitle={CategoryList}
        parent={Tour}
        title={CategoryList}
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
                      {CreateNewCategoryHeading}
                    </Button>
                  </div>
                </div>
                <div className="list-product">
                  <div className="table-responsive">
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={TourCategoryListTableDataColumn(
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

export default TourCategoryListContainer;
