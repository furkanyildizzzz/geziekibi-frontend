import TourCategoryListContainer from "@/Components/Tour/Category/TourCategoryListContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours",
};

const TourCategoryList = () => {
  return <TourCategoryListContainer />;
};
export default TourCategoryList;
