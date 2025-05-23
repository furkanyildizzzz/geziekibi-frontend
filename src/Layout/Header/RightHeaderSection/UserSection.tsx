"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Href, ImagePath } from "@/Constant/constant";
import { UserListData } from "@/Data/Layout/LayoutData";
import Link from "next/link";
import { LogOut, User } from "react-feather";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { persistor } from "@/Redux/Store";
import { clearUser, logoutUser } from "@/Redux/Reducers/UserSlice";
import { useTranslation } from "react-i18next";
import { UserSuccessResponse } from "@/Types/ApiResponseType";
import { getUserProfile } from "@/app/actions/user/getUserProfile";
import ShowError from "@/Components/Toast/Error/ShowError";

export const UserSection = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { isSuccess } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser())
  }
  const [userData, setUserData] = useState<UserSuccessResponse>();
  const { t } = useTranslation("common");
  const { t: tForm } = useTranslation("form");

  // const handleLogout = () => {
  //   Cookies.remove("token");
  //   localStorage.clear();
  //   router.push(`/auth/login`);
  // };

  const fetchUserData = async () => {
    const response = await getUserProfile();
    if ("data" in response) {
      setUserData({ ...response.data });
    } else {
      ShowError(tForm, response.errorMessage);
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/auth/login");
      dispatch(clearUser());
    }
  }, [isSuccess]);

  return (
    <li className="profile-nav onhover-dropdown p-0">
      <div className="d-flex align-items-center profile-media">
        {user?.profileImage ? (
          <img
            width={40}
            height={40}
            className="b-r-10 img-40 img-fluid"
            src={
              user?.profileImage?.secureUrl ||
              `${ImagePath}/dashboard/profile.png`
            }
            alt={""}
          />
        ) : (
          <User />
        )}
        <div className="flex-grow-1">
          <span>{user?.fullName}</span>
          <p className="mb-0">
            {user?.role} <i className="middle fa fa-angle-down" />
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {UserListData.map((item, index) => (
          <li key={index}>
            <Link href={item.path}>
              <User />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
        <li onClick={handleLogout}>
          <Link href={Href}>
            <LogOut />
            <span>Log Out</span>
          </Link>
        </li>
      </ul>
    </li>
  );
};
