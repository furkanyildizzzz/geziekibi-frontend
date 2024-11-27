import TourPathListContainer from "@/Components/Tour/Path/TourPathListContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paths",
};

const TourPathList = () => {
  return <TourPathListContainer />;
};
export default TourPathList;
