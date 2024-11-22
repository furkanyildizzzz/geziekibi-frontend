import TourCategoryListContainer from "@/Components/Tour/Category/TourCategoryListContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

const TourCategoryList = () => {
  return <TourCategoryListContainer />;
};
export default TourCategoryList;
