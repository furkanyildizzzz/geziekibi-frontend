import BlogCategoryListContainer from "@/Components/Blog/Category/BlogCategoryListContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

const BlogCategoryList = () => {
  return <BlogCategoryListContainer />;
};
export default BlogCategoryList;
