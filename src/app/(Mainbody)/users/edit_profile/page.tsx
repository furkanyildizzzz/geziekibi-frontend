import { getUserById } from "@/app/actions/user/getUserById";
import EditProfileContainer from "@/Components/Users/EditProfile/EditProfileContainer";
import React from "react";

const EditProfile = async ({ params: { id } }: { params: { id: string } }) => {
  return <EditProfileContainer />;
};

export default EditProfile;
