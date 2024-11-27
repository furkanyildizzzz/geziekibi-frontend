import AddTourContainer from "@/Components/Tour/AddTour/AddTourContainer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Tour",
};

const AddTour = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const copyTourId = searchParams.copy ? parseInt(searchParams.copy, 10) : 0; // Convert 'copy' param to number, fallback to 0
  return <AddTourContainer id={0} copyTourId={copyTourId} />;
};

export default AddTour;
