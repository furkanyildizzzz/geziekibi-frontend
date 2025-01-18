import { getTourById } from "@/app/actions/tour/self/getTourById";
import AddTourContainer from "@/Components/Tour/AddTour/AddTourContainer";
import { TourSuccessResponse } from "@/Types/ApiResponseType";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Tour",
};

const AddTour = async ({ params: { id } }: { params: { id: string } }) => {
  const response = await getTourById(Number(id));

  let tourData = {} as TourSuccessResponse;
  if ("data" in response) {
    tourData = response.data;
    metadata.title = response.data.title;
  } else if (response.errorType === "NOT FOUND") {
    throw new Error(response.errorMessage);
  }
  return <AddTourContainer id={Number(id)} tourData={tourData} />;
};

export default AddTour;
