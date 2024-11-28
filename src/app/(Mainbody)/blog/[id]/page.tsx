import { getBlogById } from "@/app/actions/blog/self/getBlogById";
import AddBlogContainer from "@/Components/Blog/AddBlog/AddBlogContainer";
import { BlogSuccessResponse } from "@/Types/ApiResponseType";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Blog",
};

const AddBlog = async ({ params: { id } }: { params: { id: string } }) => {
  const response = await getBlogById(Number(id));
  const data = "data" in response ? response.data : ({} as BlogSuccessResponse);

  return <AddBlogContainer blogId={Number(id)} blogData={data} />;
};

export default AddBlog;
