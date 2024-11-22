import SVG from "@/Components/SVG/Svg";
import { AddTourNav } from "@/Data/Tour/TourData";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useState } from "react";
import { setNavId } from "@/Redux/Reducers/AddProductSlice";
import { Col, Nav, NavItem, NavLink } from "reactstrap";
import { useTranslation } from "react-i18next";

const TourLeftSidebar = () => {
  const { navId } = useAppSelector((state) => state.addProduct);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

  return (
    <Col
      xxl="3"
      xl="4"
      className="box-col-4e sidebar-left-wrapper mb-2 add-product-tab"
    >
      <Nav pills className="sidebar-left-icons border-0" tabs>
        {AddTourNav.map((data, i) => (
          <NavItem key={i}>
            <NavLink
              className="border-0"
              active={navId === data.id ? true : false}
              onClick={() => dispatch(setNavId(data.id))}
            >
              <div className="nav-rounded">
                <div className="product-icons">
                  <SVG className="stroke-icon" iconId={data.icon} />
                </div>
              </div>
              <div className="product-tab-content" title={t(data.detail)}>
                <h6>{t(data.title)}</h6>
                <p>{t(data.detail)}</p>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Col>
  );
};

export default TourLeftSidebar;
