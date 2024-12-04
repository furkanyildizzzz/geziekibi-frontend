import { getTourById } from "@/app/actions/tour/self/getTourById";
import AddTourContainer from "@/Components/Tour/AddTour/AddTourContainer";
import { TourSuccessResponse } from "@/Types/ApiResponseType";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Tour",
};

const AddTour = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const copyTourId = searchParams.copy ? parseInt(searchParams.copy, 10) : 0; // Convert 'copy' param to number, fallback to 0

  let tourData = {} as TourSuccessResponse;
  if (copyTourId) {
    const response = await getTourById(Number(copyTourId));
    if ("data" in response) {
      tourData = response.data;
      metadata.title = "Kopya - " + response.data.title;
    }
  }

  return (
    <AddTourContainer id={0} copyTourId={copyTourId} tourData={tourData} />
  );
};

export default AddTour;
