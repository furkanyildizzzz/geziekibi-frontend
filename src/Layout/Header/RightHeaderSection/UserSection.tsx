"use client";
import React from "react";
import Image from "next/image";
import { Href, ImagePath } from "@/Constant/constant";
import { UserListData } from "@/Data/Layout/LayoutData";
import Link from "next/link";
import { LogOut } from "react-feather";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const UserSection = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("dunzo_token");
    localStorage.clear();
    router.push(`/auth/login`);
  };
  return (
    <li className="profile-nav onhover-dropdown p-0">
      <div className="d-flex align-items-center profile-media">
        <Image priority width={40} height={40} className="b-r-10 img-40 img-fluid" src={`${ImagePath}/dashboard/profile.png`} alt="user" />
        <div className="flex-grow-1">
          <span>Helen Walter</span>
          <p className="mb-0">Admin <i className="middle fa fa-angle-down" /></p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {UserListData.map((item, index) => (
          <li key={index}>
            <Link href={item.path}>{item.icon}<span>{item.title}</span></Link>
          </li>
        ))}
        <li onClick={handleLogout}>
          <Link href={Href}><LogOut /><span>Log Out</span></Link>
        </li>
      </ul>
    </li>
  );
};
