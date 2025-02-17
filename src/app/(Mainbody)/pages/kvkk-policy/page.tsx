import { getStaticPageByType } from "@/app/actions/staticPage/getStaticPageByType";
import { PageTypeEnum } from "@/app/lib/enums";
import AddStaticPageContainer from "@/Components/StaticPage/AddStaticPage/AddStaticPageContainer";
import { StaticPageSuccessResponse } from "@/Types/ApiResponseType";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Static Page",
};

const AddStaticPage = async () => {
  const response = await getStaticPageByType(PageTypeEnum.PageKVKKPolicy);
  const data =
    "data" in response
      ? response.data
      : ({
          pageType: PageTypeEnum.PageKVKKPolicy,
        } as StaticPageSuccessResponse);

  console.log({ data });
  return (
    <AddStaticPageContainer
      staticPageId={Number(data.id)}
      staticPageData={data}
    />
  );
};

export default AddStaticPage;
