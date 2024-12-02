//@ts-nocheck
import { useState } from "react";
import { Accordion, Card, CardBody, Col } from "reactstrap";
import CommonAccordionItem from "./CommonAccordionItem";
import { StaticAccordion } from "./StaticAccordion";
import { SimpleAccordions } from "@/Constant/constant";
import { CommonCardHeader } from "@/Components/General/Widgets/Common/CommonCardHeader";

export const AccordionData = [
  {
    text: "Click the accordions below to expand/collapse the accordion content. Use the ",
    code: ".accordion",
  },
];

export const SimpleAccordion2: string =
  "<p> <strong> Search engine optimization: </strong> Search engine optimization (SEO) is a method for improving the chances for a website to be found by search engines. Web design codes information in a way that search engines can read it. It can boost business because the site shows up on the top search result pages, helping people to find it. <br /> <br /> <strong> Mobile responsiveness:</strong> Mobile responsiveness is the feature of a website that allows it to display on a mobile device and adapt its layout and proportions to be legible. Web design ensures sites are easy to view and navigate from mobile devices. When a website is well-designed and mobile-responsive, customers can reach the business with ease. <br /> <br /> <strong> Improved sales:</strong>Increasing the number of items sold or acquiring more active customers are objectives of a compelling website. As web design reaches targeted customers and search engines, it helps the business make conversions on their site and improve its sales. </p>";
export const SimpleAccordion3: string =
  "<p> The web design process allows designers to adjust to any preferences and provide effective solutions. There are many standard components of every web design, including: </p><ul class='d-flex flex-column gap-2 accordions-content'> <li>--&gt; Layout</li><li>--&gt; Images</li><li>--&gt; Visual hierarchy</li><li>--&gt; Color scheme</li><li>--&gt; Typography</li><li>--&gt; Navigation</li><li>--&gt; Readability</li><li>--&gt; Content</li></ul>";

export const AccordionList = [
  {
    id: "2",
    icon: true,
    accordionHeaderClass: "bg-light-primary",
    accordionHeading: "What is the use of web design?",
    spanClass: "txt-primary",
    bodyText: (
      <div dangerouslySetInnerHTML={{ __html: SimpleAccordion2 }}></div>
    ),
  },
  {
    id: "3",
    icon: true,
    accordionHeaderClass: "bg-light-primary",
    accordionHeading: "What are the elements of web design?",
    spanClass: "txt-primary",
    bodyText: (
      <div dangerouslySetInnerHTML={{ __html: SimpleAccordion3 }}></div>
    ),
  },
];

export const SimpleAccordion = () => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  return (
    <Col sm="12" xl="12">
      <Card className="basic-accordion">
        <CommonCardHeader
          title={SimpleAccordions}
          subTitle={AccordionData}
          headClass="pb-0"
        />
        <CardBody>
          <Accordion open={open} toggle={toggle} className="dark-accordion">
            <StaticAccordion />
            {AccordionList.map((data, index) => (
              <CommonAccordionItem item={data} key={index} />
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </Col>
  );
};
