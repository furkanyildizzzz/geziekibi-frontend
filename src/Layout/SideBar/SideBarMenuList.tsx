import { useAppSelector } from "@/Redux/Hooks";
import { Fragment, useState } from "react";
import Menulist from "./Menulist";
import { MenuList } from "@/Data/Layout/Menu";
import { MenuItem } from "@/Types/LayoutTypes";
import { useTranslation } from "react-i18next";
import { Link } from "react-feather";
import { Href, Logout } from "@/Constant/constant";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SidebarMenuList = () => {
  const [activeMenu, setActiveMenu] = useState([]);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const shouldHideMenu = (mainMenu: MenuItem) => {
    return mainMenu?.Items?.map((data) => data.title).every((titles) =>
      pinedMenu.includes(titles || "")
    );
  };
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    router.push(`/auth/login`);
  };

  return (
    <>
      {MenuList &&
        MenuList.map((mainMenu: MenuItem, index) => (
          <Fragment key={index}>
            <li
              className={`sidebar-main-title ${
                shouldHideMenu(mainMenu) ? "d-none" : ""
              }`}
            >
              <div>
                <h6 className={mainMenu.lanClass && mainMenu.lanClass}>
                  {t(mainMenu.title)}
                </h6>
              </div>
            </li>
            <Menulist
              menu={mainMenu.Items}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              level={0}
            />
          </Fragment>
        ))}
      <li className={`sidebar-main-title`} onClick={handleLogout}>
        <div>
          <h6 className={""}>{t("Logout")}</h6>
        </div>
        <ul>
          <li className="sidebar-list"></li>
        </ul>
      </li>
    </>
  );
};

export default SidebarMenuList;
