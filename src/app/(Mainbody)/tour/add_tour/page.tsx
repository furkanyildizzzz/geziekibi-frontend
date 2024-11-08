import AddTourContainer from "@/Components/Tour/AddTour/AddTourContainer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Tour",
};

const AddTour = () => {
  return <AddTourContainer />;
};

export default AddTour;
