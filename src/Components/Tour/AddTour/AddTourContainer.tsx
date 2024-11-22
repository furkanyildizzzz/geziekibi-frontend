"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import TourBody from "./TourBody/TourBody";
import {
  ErrorValidation,
  TourPriceSuccessResponse,
} from "@/Types/ApiResponseType";
import { getTourById } from "@/app/actions/tour/self/getTourById";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue, resetTourForm } from "@/Redux/Reducers/AddProductSlice";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumbs from "@/Components/Breadcrumb";
const AddTourContainer = ({
  id,
  copyTourId,
}: {
  id?: number;
  copyTourId?: number;
}) => {
  const pathname = usePathname();
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { formValue } = useAppSelector((state) => state.addProduct);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

  const router = useRouter();

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

  const copyTour = async (id: number) => {
    const response = await getTourById(id);
    if ("data" in response) {
      console.log({ getTourById: response.data });
      Object.entries(response.data).forEach(([key, value]: [string, any]) => {
        if (key === "prices") {
          value = value.map((val: TourPriceSuccessResponse, index: number) => {
            return { ...val, rowId: index + 1 };
          });
        }
        if (
          key !== "id" &&
          key !== "uploadedPrimaryImages" &&
          key !== "uploadedGalleryImages"
        )
          dispatch(setFormValue({ name: key, value: value }));
      });
    } else {
      router.replace(`/tour/add_tour`); // Reloads the current page
    }
  };

  useEffect(() => {
    dispatch(resetTourForm(""));
    if (id) {
      fetchTour(id);
    } else if (copyTourId) {
      dispatch(setFormValue({ name: "copyTourId", value: copyTourId }));
      copyTour(copyTourId);
    }
  }, []);

  const handleCopyTour = () => {
    router.replace(`/tour/add_tour?copy=${formValue.id}`); // Reloads the current page
  };

  return (
    <>
      {formValue.id ? (
        <Breadcrumbs
          pageTitle={formValue.title}
          parent={t("Tour")}
          title={formValue.title}
        />
      ) : (
        <Breadcrumbs
          pageTitle={t("AddTour")}
          parent={t("Tour")}
          title={t("AddTour")}
        />
      )}
      <Container key={formValue.id || "add_tour"} fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader
                style={{ display: "flex", alignItems: "center", gap: "2%" }}
              >
                <h4>{t("TourForm")}</h4>
                {formValue.id > 0 && (
                  <Button
                    color="warning"
                    title={t("Copy Tour")}
                    onClick={handleCopyTour}
                  >
                    <i className="fa fa-copy"></i>
                  </Button>
                )}
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
