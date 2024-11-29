"use client";
import { PostEdit, AddPost } from "@/Constant/constant";
import React, { useEffect } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { FormPost } from "./FormPost";
import { CommonCardHeader } from "@/Components/General/Widgets/Common/CommonCardHeader";
import Breadcrumbs from "@/Components/Breadcrumb";
import { useTranslation } from "react-i18next";
import { StaticPageSuccessResponse } from "@/Types/ApiResponseType";
import { FormProvider, useForm } from "react-hook-form";
import {
  StaticPageValidationFormSchema,
  StaticPageValidationSchema,
} from "@/app/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddStaticPageContainerProps {
  staticPageId: number;
  staticPageData: StaticPageSuccessResponse;
}
const AddStaticPageContainer: React.FC<AddStaticPageContainerProps> = ({
  staticPageId,
  staticPageData,
}) => {
  const { t } = useTranslation("common");
  const methods = useForm<StaticPageValidationSchema>({
    resolver: zodResolver(StaticPageValidationFormSchema),
    defaultValues: {
      title: staticPageData.id ? staticPageData.title : "",
      body: staticPageData.id ? staticPageData.body : "",
      pageType: staticPageData.id ? staticPageData.pageType : undefined,
    },
  });

  return (
    <>
      <Breadcrumbs
        pageTitle={
          staticPageData.id ? staticPageData.title : t("Add Static Page")
        }
        parent={t("Static Page")}
        title={staticPageData.id ? staticPageData.title : t("Add Static Page")}
      />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody className="add-post">
                <FormProvider {...methods}>
                  <FormPost
                    staticPageId={staticPageId}
                    staticPageData={staticPageData}
                  />
                </FormProvider>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddStaticPageContainer;
