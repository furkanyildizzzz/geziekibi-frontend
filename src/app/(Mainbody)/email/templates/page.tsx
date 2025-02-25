import EmailTemplateListContainer from "@/Components/EmailTemplate/EmailTemplateListContainer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Email Templates",
};

const EmailTemplateList = () => {
  return <EmailTemplateListContainer />;
};

export default EmailTemplateList;
