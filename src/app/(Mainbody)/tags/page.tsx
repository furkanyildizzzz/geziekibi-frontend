import TagListContainer from "@/Components/General/Tag/TagListContainer";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
  title: "Tags",
};

const TagList = () => {
  return <TagListContainer />;
};

export default TagList;
