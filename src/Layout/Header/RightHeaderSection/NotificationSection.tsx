"use client";
import SVG from "@/CommonComponent/SVG/Svg";
import { Href, Notifications } from "@/Constant/constant";
import { NotificationData } from "@/Data/Layout/LayoutData";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNotification } from "@/Redux/Reducers/HeaderBookmarkSlice";
import Link from "next/link";

export const NotificationSection = () => {
  const { notification } = useAppSelector((state) => state.headerBookMark);
  const dispatch = useAppDispatch()

  return (
    <li className="onhover-dropdown" onClick={()=>dispatch(setNotification(true))}>
      <div className="notification-box">
        <SVG iconId="fill-Bell" />
      </div>
      <div className={`onhover-show-div notification-dropdown ${notification ? "active" : ""}`}>
        <h6 className="f-18 mb-0 dropdown-title">{Notifications}</h6>
        <ul>
          {NotificationData.map((item, index) => (
            <li className={`b-l-${item.color} bg-light-${item.color} border-4 mt-3`} key={index}>
              <p className={`font-${item.color}`}>
                {item.title}
                <span className={`font-${item.color}`}>{item.span}</span>
              </p>
            </li>
          ))}
          <li>
            <Link className="f-w-700" href={Href}>Check all</Link>
          </li>
        </ul>
      </div>
    </li>
  );
};
