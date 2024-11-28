import AddBlogContainer from "@/Components/Blog/AddBlog/AddBlogContainer";
import { BlogSuccessResponse } from "@/Types/ApiResponseType";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Blog",
};

const AddBlog = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return <AddBlogContainer blogId={0} blogData={{} as BlogSuccessResponse} />;
};

export default AddBlog;
