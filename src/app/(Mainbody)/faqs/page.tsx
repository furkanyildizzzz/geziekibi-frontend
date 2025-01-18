import FAQListContainer from "@/Components/FAQ/FAQListContainer";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
  title: "FAQs",
};

const FAQList = () => {
  return <FAQListContainer />;
};

export default FAQList;
