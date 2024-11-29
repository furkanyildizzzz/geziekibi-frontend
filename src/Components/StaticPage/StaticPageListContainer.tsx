"use client";
import { SearchTableButton } from "@/Constant/constant";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { useTranslation } from "react-i18next";
import Breadcrumbs from "@/Components/Breadcrumb";
import ShowError from "../Toast/Error/ShowError";
import ShowSuccess from "../Toast/Success/ShowSuccess";
import {
  StaticPageListTableDataColumn,
  StaticPageListTableDataColumnType,
} from "@/Types/StaticPageType";
import { getStaticPageList } from "@/app/actions/staticPage/getStaticPageList";
import { deleteStaicPage } from "@/app/actions/staticPage/deleteStaticPage";

const StaticPageListContainer = () => {
  const [staticPageList, setStaticPageList] = useState<
    StaticPageListTableDataColumnType[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  const { t } = useTranslation("common");
  const pathname = usePathname();

  const fetchData = async () => {
    const response = await getStaticPageList();
    if ("errorMessage" in response) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage("");
      setStaticPageList([
        ...response.data.map((s) => {
          return {
            id: s.id,
            title: s.title,
            pageType: s.pageType,
          };
        }),
      ]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pathname]);

  const filteredItems = staticPageList
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
    window.open(`/static-page/${id}`, "_blank");
  };

  const handleAdd = () => {
    window.open("/static-page/add-static-page", "_blank");
  };

  const handleDelete = async (title: string, id: number) => {
    try {
      setIsLoading(true);

      if (window.confirm(`Are you sure you want to delete:\r ${title} ?`)) {
        const response = await deleteStaicPage(id);

        if ("errorType" in response) ShowError(response.errorMessage);
        else ShowSuccess(response.message);

        await fetchData();
      }
    } catch (error) {
      setErrorMessage("Failed to delete page. Please try again.");
      ShowError("Failed to delete page. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Breadcrumbs
        pageTitle={t("StaticPageList")}
        parent={t("StaticPage")}
        title={t("StaticPageList")}
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
                      {t("Create New StaticPage")}
                    </Button>
                  </div>
                </div>
                <div className="list-product">
                  <div className="table-responsive">
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={StaticPageListTableDataColumn(
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

export default StaticPageListContainer;
