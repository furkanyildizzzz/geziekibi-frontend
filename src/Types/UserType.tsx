import { InputType } from "reactstrap/types/lib/Input";
import { UserAddress, UserSuccessResponse } from "./ApiResponseType";

export interface CommonUserFooterType {
  listClass?: string;
}

// Define types that omit specific fields
export type OmittedUserSuccessResponse = Omit<
  UserSuccessResponse,
  "uploadedPrimaryImages" | "address"
>;
export type OmittedUserAddress = Omit<UserAddress, "uploadedPrimaryImages">;

// Now, the `name` property can be either from `UserSuccessResponse` or `UserAddress`, but without the omitted fields
export interface CommonUserFormGroupType {
  name:
    | keyof (OmittedUserSuccessResponse & UserAddress)
    | "newPassword"
    | "confirmNewPassword";

  title: string;
  placeholder?: string;
  type: InputType;
  defaultValue?: string;
  row?: number;
}

export interface userCardTypes {
  id: number;
  card_bg: string;
  avatar: string;
  name: string;
  userProfile: string;
  follower: string;
  following: string;
  totalPost: string;
}

export interface UserCardsFooterProp {
  item: userCardTypes;
}
