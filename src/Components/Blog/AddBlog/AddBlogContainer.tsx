"use client";
import {
  Blog,
  BlogDiscardButton,
  BlogPostButton,
  PostEdit,
  AddPost,
} from "@/Constant/constant";
import React, { useEffect } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { FormPost } from "./FormPost";
import DropzoneClass from "./BlogPrimaryImages";
import { CommonCardHeader } from "@/Components/General/Widgets/Common/CommonCardHeader";
import Breadcrumbs from "@/Components/Breadcrumb";
import { useTranslation } from "react-i18next";
import { BlogSuccessResponse } from "@/Types/ApiResponseType";
import { FormProvider, useForm } from "react-hook-form";
import {
  BlogValidationFormSchema,
  BlogValidationSchema,
} from "@/app/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { PublishStatusEnum } from "@/app/lib/enums";

interface AddBlogContainerProps {
  blogId: number;
  blogData: BlogSuccessResponse;
}
const AddBlogContainer: React.FC<AddBlogContainerProps> = ({
  blogId,
  blogData,
}) => {
  const { t } = useTranslation("common");
  const methods = useForm<BlogValidationSchema>({
    resolver: zodResolver(BlogValidationFormSchema),
    defaultValues: {
      title: blogData.id ? blogData.title : "",
      spot: blogData.id ? blogData.spot : "",
      body: blogData.id ? blogData.body : "",
      category: blogData.id ? blogData.category : undefined,
      tags: blogData.id
        ? blogData.tags.map((s) => {
            return { id: s.id, name: s.name };
          })
        : [],
      publishStatus: blogData.id
        ? (blogData.publishStatus as PublishStatusEnum)
        : PublishStatusEnum.PUBLISH,
      publishDate: blogData.id ? blogData.publishDate : new Date(),
      uploadedPrimaryImages: blogData.id ? blogData.uploadedPrimaryImages : [],
    },
  });

  return (
    <>
      <Breadcrumbs
        pageTitle={t("Add Blog")}
        parent={t("Blog")}
        title={t("Add Blog")}
      />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title={PostEdit} />
              <CardBody className="add-post">
                <FormProvider {...methods}>
                  <FormPost blogId={blogId} blogData={blogData} />
                </FormProvider>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddBlogContainer;
