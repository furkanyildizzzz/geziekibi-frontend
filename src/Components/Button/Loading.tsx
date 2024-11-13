import { Loading } from "@/Constant/constant";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Span = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: "absolute";
  left: "0.5rem";
  top: "50%";
  transform: "translateY(-50%)";
`;

export const LoadingButton = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Span className="spinner" style={{}} />
      {t("Loading")}...
    </>
  );
};
