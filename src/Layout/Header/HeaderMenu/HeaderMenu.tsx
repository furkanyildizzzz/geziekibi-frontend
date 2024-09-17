"use client";
import React from "react";
import { Col } from "reactstrap";
import Link from "next/link";
import { LeftHeaderData } from "@/Data/Layout/LayoutData";
import SVG from "@/CommonComponent/SVG/Svg";
import { MobileHeaderMenu } from "./MobileHeaderMenu";
import { Href } from "@/Constant/constant";

export const HeaderMenu = () => {
  return (
    <Col xxl="5" xl="6" xs="auto" className="left-header box-col-6 horizontal-wrapper p-0">
      <div className="left-menu-header">
        <MobileHeaderMenu/>
        <ul className="header-left">
          {LeftHeaderData.map((data) => (
            <li className={`onhover-dropdown ${data.id === 4 ? "p-0" : ""}`} key={data.id}>
              <span className="f-w-500">
                <SVG iconId={data.icon} /> {data.text}
              </span>
              <ul className="onhover-show-div left-dropdown">
                {data.child.map((item) => (
                  <li key={item.id}>
                    <Link href={Href}>{item.text}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Col>
  );
};
