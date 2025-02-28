"use client";
import { getEmailTemplateList } from "@/app/actions/emailTemplate/getEmailTemplateList";
import { EmailTemplateEnum } from "@/app/lib/enums";
import Breadcrumbs from "@/Components/Breadcrumb";
import { SearchTableButton } from "@/Constant/constant";
import { EmailTemplateListSuccessResponse } from "@/Types/ApiResponseType";
import { EmailTemplateListTableDataColumn } from "@/Types/EmailTemplateType";
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

const EmailTemplateListContainer = () => {
  const [emailTemplateList, setEmailTemplateList] = useState<
    { key: EmailTemplateEnum }[]
  >(
    Object.values(EmailTemplateEnum).map((value) => {
      return { key: value };
    })
  );
  const [filterText, setFilterText] = useState("");

  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation("common");

  // const fetchData = async () => {
  //   const response = await getEmailTemplateList();
  //   if ("errorMessage" in response) {
  //     setErrorMessage(response.errorMessage);
  //   } else {
  //     setErrorMessage("");
  //     setEmailTemplateList(response.data);
  //     setIsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   setEmailTemplateList(
  //     Object.values(EmailTemplateEnum).map((value) => {
  //       return { key: value };
  //     })
  //   );
  // }, []);

  const filteredItems = emailTemplateList.filter((item) => {
    return Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });
  // .sort((a, b) => {
  //   return b.id - a.id;
  // });

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

  const handleEdit = async (key: EmailTemplateEnum) => {
    router.push(`/email/templates/${key}`);
  };
  return (
    <>
      <Breadcrumbs
        pageTitle={t("EmailTemplateList")}
        parent={t("Settings")}
        title={t("EmailTemplateList")}
      />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="list-product-header"></div>
                <div className="list-product">
                  <div className="table-responsive">
                    <DataTable
                      className="custom-scrollbar"
                      data={filteredItems}
                      columns={EmailTemplateListTableDataColumn(handleEdit)}
                      striped
                      highlightOnHover
                      pagination
                      subHeader
                      subHeaderComponent={subHeaderComponentMemo}
                      subHeaderAlign={Alignment.LEFT}
                      onRowDoubleClicked={(row) => handleEdit(row.key)}
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

export default EmailTemplateListContainer;
