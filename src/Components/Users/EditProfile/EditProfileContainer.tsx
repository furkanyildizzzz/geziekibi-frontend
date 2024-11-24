"use client";
import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import MyProfile from "./MyProfile/MyProfile";
import EditProfileForm from "./EditProfiles/EditProfileForm";
import { EditProfile, User } from "@/Constant/constant";
import Breadcrumbs from "@/Components/Breadcrumb";
import { useTranslation } from "react-i18next";
import {
  ApiResponse,
  ErrorValidation,
  UserSuccessResponse,
} from "@/Types/ApiResponseType";
import ShowError from "@/Components/Toast/Error/ShowError";
import { redirect, useRouter } from "next/navigation";
import { getUserById } from "@/app/actions/user/getUserById";
import { getUserProfile } from "@/app/actions/user/getUserProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserFormSchema } from "@/app/lib/definitions";

const EditProfileContainer = () => {
  const { t } = useTranslation("common");

  const [userData, setUserData] = useState<UserSuccessResponse>();

  const router = useRouter();

  const fetchUserData = async () => {
    const response = await getUserProfile();
    if ("data" in response) {
      setUserData({ ...response.data });
    } else {
      ShowError(response.errorMessage);
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [""]);

  return (
    <>
      <Breadcrumbs
        pageTitle={t("User Edit")}
        parent={t("User")}
        title={t("User Edit")}
      />
      <Container fluid>
        <div className="edit-profile">
          <Row>
            <MyProfile user={userData!} />
            <EditProfileForm user={userData!} />
          </Row>
        </div>
      </Container>
    </>
  );
};

export default EditProfileContainer;
