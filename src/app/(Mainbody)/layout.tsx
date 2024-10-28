"use client";
import Footer from "@/Layout/Footer/Footer";
import Header from "@/Layout/Header/Header";
import TapTop from "@/Layout/Header/TapTop/TapTop";
import { SideBar } from "@/Layout/SideBar/SideBar";
import ThemeCustomizer from "@/Layout/ThemeCustomizer/ThemeCustomizer";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setToggleSidebar } from "@/Redux/Reducers/LayoutSlice";
import { setLayout } from "@/Redux/Reducers/ThemeCustomizerSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const { layout } = useAppSelector((state) => state.themeCustomizer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const compactSidebar = () => {
      let windowWidth = window.innerWidth;
      if (layout === "compact-wrapper") {
        if (windowWidth < 1200) {
          dispatch(setToggleSidebar(true));
        } else {
          dispatch(setToggleSidebar(false));
        }
      } else if (layout === "horizontal-wrapper") {
        if (windowWidth < 992) {
          dispatch(setToggleSidebar(true));
          dispatch(setLayout("compact-wrapper"));
        } else {
          dispatch(setToggleSidebar(false));
          dispatch(setLayout(localStorage.getItem("layout")));
        }
      }
    };
    compactSidebar();
    window.addEventListener("resize", () => {
      compactSidebar();
    });
  }, [dispatch, layout]);

  return (
    <>
      <div className={`page-wrapper ${layout}`} id="pageWrapper">
        <Header />
        <div className="page-body-wrapper">
          <SideBar />
          <div className="page-body">
            {children}
            {modal}
          </div>
          <Footer />
        </div>
      </div>
      <ThemeCustomizer />
      <ToastContainer />
      <TapTop />
    </>
  );
}
