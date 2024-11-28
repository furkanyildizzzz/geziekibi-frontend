import TourListContainer from "@/Components/Tour/Self/TourListContainer";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
  title: "Tours",
};

const TourList = () => {
  return <TourListContainer />;
};

export default TourList;
