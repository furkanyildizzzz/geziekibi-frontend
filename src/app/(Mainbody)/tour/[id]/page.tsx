import AddTourContainer from "@/Components/Tour/AddTour/AddTourContainer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Tour",
};

const AddTour = ({ params: { id } }: { params: { id: string } }) => {
  return <AddTourContainer id={Number(id)} />;
};

export default AddTour;
