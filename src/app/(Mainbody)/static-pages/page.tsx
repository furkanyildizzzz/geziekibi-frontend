import StaticPageListContainer from "@/Components/StaticPage/StaticPageListContainer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Static Pages",
};

const StaticPageList = () => {
  return <StaticPageListContainer />;
};

export default StaticPageList;
