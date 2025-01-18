"use client";
import { deleteFAQ } from "@/app/actions/faq/deleteFaq";
import { getFAQList } from "@/app/actions/faq/getFaqList";
import Breadcrumbs from "@/Components/Breadcrumb";
import { SearchTableButton } from "@/Constant/constant";
import {
  FAQSuccessResponse,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { FAQListTableDataColumn } from "@/Types/FAQType";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

const FAQListContainer = () => {
  const [faqList, setFAQList] = useState<FAQSuccessResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [filterText, setFilterText] = useState("");

  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation("common");

  const fetchData = async () => {
    const response = await getFAQList();
    if ("errorMessage" in response) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage("");
      setFAQList(response.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pathname]);

  const filteredItems = faqList
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
    router.push(`/faq/${id}`);
  };

  const handleAdd = () => {
    router.push("/faq/add-faq");
  };

  const handleDelete = async (name: string, id: number) => {
    try {
      setIsLoading(true);

      if (window.confirm(`Are you sure you want to delete:\r ${name} ?`)) {
        await deleteFAQ(id);
        await fetchData();
      }
    } catch (error) {
      setErrorMessage("Failed to delete faq. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Breadcrumbs
        pageTitle={t("FAQList")}
        parent={t("Tour")}
        title={t("FAQList")}
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
                      {t("CreateNew")}
                    </Button>
                  </div>
                </div>
                <div className="list-product">
                  <div className="table-responsive">
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={FAQListTableDataColumn(handleEdit, handleDelete)}
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

export default FAQListContainer;
