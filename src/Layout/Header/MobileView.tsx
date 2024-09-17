"use client";
import SVG from "@/CommonComponent/SVG/Svg";
import { ImagePath } from "@/Constant/constant";
import { useAppDispatch } from "@/Redux/Hooks";
import { handleResponsiveToggle } from "@/Redux/Reducers/LayoutSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col } from "reactstrap";

export const MobileView = () => {
  const dispatch = useAppDispatch();

  return (
    <Col xs="auto" className="header-logo-wrapper p-0">
      <div className="logo-wrapper">
        <Link href="/dashboard/default">
          <Image width={120} height={38} className="img-fluid for-light" src={`${ImagePath}/logo/logo-1.png`} alt="" priority />
          <Image width={120} height={38} className="img-fluid for-dark" src={`${ImagePath}/logo/logo.png`} alt=""  priority/>
        </Link>
      </div>
      <div className="toggle-sidebar">
        <SVG iconId="stroke-animation" className="sidebar-toggle" onClick={()=>dispatch(handleResponsiveToggle())}  />
      </div>
    </Col>
  );
};
