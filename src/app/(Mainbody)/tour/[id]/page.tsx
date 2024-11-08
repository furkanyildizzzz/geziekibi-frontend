import { getTourById } from "@/app/actions/tour/self/getTourById";
import AddTourContainer from "@/Components/Tour/AddTour/AddTourContainer";
import { ErrorValidation } from "@/Types/ApiResponseType";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Edit Tour",
};

const AddTour = ({ params: { id } }: { params: { id: string } }) => {
  return <AddTourContainer id={Number(id)} />;
};

export default AddTour;
