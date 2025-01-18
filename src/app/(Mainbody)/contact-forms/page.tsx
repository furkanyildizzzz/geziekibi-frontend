import ContactFormListContainer from "@/Components/ContactForm/ContactFormListContainer";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Forms",
};

const ContactFormList = () => {
  return <ContactFormListContainer />;
};

export default ContactFormList;
