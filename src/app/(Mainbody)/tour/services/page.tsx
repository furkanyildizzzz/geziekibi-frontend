import TagListContainer from "@/Components/Tag/TagListContainer";
import ServiceListContainer from "@/Components/Tour/Service/ServiceListContainer";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
  title: "Services",
};

const TagList = () => {
  return <ServiceListContainer />;
};

export default TagList;
