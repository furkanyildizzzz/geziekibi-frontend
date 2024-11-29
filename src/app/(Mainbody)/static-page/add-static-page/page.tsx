import AddStaticPageContainer from "@/Components/StaticPage/AddStaticPage/AddStaticPageContainer";
import { StaticPageSuccessResponse } from "@/Types/ApiResponseType";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Static Page",
};

const AddStaticPage = () => {
  return (
    <AddStaticPageContainer
      staticPageId={0}
      staticPageData={{} as StaticPageSuccessResponse}
    />
  );
};

export default AddStaticPage;
