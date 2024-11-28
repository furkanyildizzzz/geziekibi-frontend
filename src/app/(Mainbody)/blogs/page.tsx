import BlogListContainer from "@/Components/Blog/BlogListContainer";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs",
};

const BlogList = () => {
  return <BlogListContainer />;
};

export default BlogList;
