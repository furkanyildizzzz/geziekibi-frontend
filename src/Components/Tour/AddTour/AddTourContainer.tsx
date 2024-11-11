"use client";
import React, { useEffect, useState } from "react";
import {
  AddTour,
  ECommerce,
  EditTour,
  Tour,
  TourForm,
} from "@/Constant/constant";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import TourBody from "./TourBody/TourBody";
import Breadcrumbs from "@/CommonComponent/Breadcrumb";
import {
  ErrorValidation,
  TourPriceSuccessResponse,
} from "@/Types/ApiResponseType";
import { getTourById } from "@/app/actions/tour/self/getTourById";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
const AddTourContainer = ({ id }: { id?: number }) => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { formValue } = useAppSelector((state) => state.addProduct);
  const dispatch = useAppDispatch();
  const fetchTour = async (id: number) => {
    const response = await getTourById(id);
    if ("data" in response) {
      console.log({ getTourById: response.data });
      Object.entries(response.data).forEach(([key, value]: [string, any]) => {
        if (key === "prices") {
          value = value.map((val: TourPriceSuccessResponse, index: number) => {
            return { ...val, rowId: index + 1 };
          });
        }
        dispatch(setFormValue({ name: key, value: value }));
      });
    } else {
      // redirec to add_tour page
    }
  };

  useEffect(() => {
    if (id) {
      fetchTour(id);
    }
  }, []);

  return (
    <>
      {formValue.id ? (
        <Breadcrumbs
          pageTitle={formValue.title}
          parent={Tour}
          title={formValue.title}
        />
      ) : (
        <Breadcrumbs pageTitle={AddTour} parent={ECommerce} title={AddTour} />
      )}
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <h4>{TourForm}</h4>
              </CardHeader>
              <CardBody>
                <TourBody />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddTourContainer;
