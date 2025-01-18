import { getStaticPageById } from "@/app/actions/staticPage/getStaticPageById";
import AddStaticPageContainer from "@/Components/StaticPage/AddStaticPage/AddStaticPageContainer";
import { StaticPageSuccessResponse } from "@/Types/ApiResponseType";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Static Page",
};

const AddStaticPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const response = await getStaticPageById(Number(id));
  const data =
    "data" in response ? response.data : ({} as StaticPageSuccessResponse);
  console.log({ data, id });
  return (
    <AddStaticPageContainer staticPageId={Number(id)} staticPageData={data} />
  );
};

export default AddStaticPage;
