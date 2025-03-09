"use client";
import { deleteTourPath } from "@/app/actions/tour/tourPath/deleteTourPath";
import { deleteTourPaths } from "@/app/actions/tour/tourPath/deleteTourPaths";
import { getTourPathList } from "@/app/actions/tour/tourPath/getTourPathList";
import Breadcrumbs from "@/Components/Breadcrumb";
import {
  SearchTableButton,
} from "@/Constant/constant";
import { TourPathSuccessResponse } from "@/Types/ApiResponseType";
import { TourPathListTableDataColumn } from "@/Types/TourPathType";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable, { Alignment } from "react-data-table-component";
import { useTranslation } from "react-i18next";
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

const TourPathListContainer = () => {
  const [tourPathList, setTourPathList] = useState<
    TourPathSuccessResponse[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [filterText, setFilterText] = useState("");

  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation("common");

  const fetchData = async () => {
    const response = await getTourPathList();
    if ("errorMessage" in response) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage("");
      setTourPathList(response.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pathname]);

  const filteredItems = tourPathList
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
    router.push(`/tour/paths/${id}`);
  };

  const handleAdd = () => {
    router.push("/tour/paths/add-path");
  };

  const handleRowSelected = useCallback((state: any) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = async (name: string, id: number) => {
    try {
      setIsLoading(true);

      if (window.confirm(`Are you sure you want to delete:\r ${name} ?`)) {
        await deleteTourPath(id);
        await fetchData();
      }
    } catch (error) {
      setErrorMessage("Failed to delete path. Please try again.");
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
            (r: TourPathSuccessResponse) => r.name
          )} ?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        // setTagList(
        //   tagList.filter((item: TagSuccessResponse) =>
        //     selectedRows.filter((elem: TagSuccessResponse) => elem.id === item.id)
        //       .length > 0
        //       ? false
        //       : true
        //   )
        // );
        const ids = selectedRows.map((item: TourPathSuccessResponse) => item.id);
        await deleteTourPaths(ids);
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
        pageTitle={t("PathList")}
        parent={t("Tour")}
        title={t("PathList")}
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
                      {t("CreateNewPathHeading")}
                    </Button>
                  </div>
                </div>
                <div className="list-product">
                  <div className="table-responsive">
                    {selectedRows.length !== 0 && (
                      <Button
                        color="danger"
                        onClick={handleMultipleDelete}
                        className="mb-3"
                      >
                        {t("DeleteSelectDataButton")}
                      </Button>
                    )}
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={TourPathListTableDataColumn(
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

export default TourPathListContainer;
