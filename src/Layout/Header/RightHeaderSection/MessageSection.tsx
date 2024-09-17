"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ImagePath, Message } from "@/Constant/constant";
import SVG from "@/CommonComponent/SVG/Svg";
import { MessageData } from "@/Data/Layout/LayoutData";
import { X } from "react-feather";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setMessage } from "@/Redux/Reducers/HeaderBookmarkSlice";
import { HeaderMessageType } from "@/Types/LayoutTypes";

export const MessageSection = () => {
  const [messageData, setMessageData] = useState(MessageData);
  const { message } = useAppSelector((state) => state.headerBookMark);
  const dispatch = useAppDispatch();

  const handleDelete = (item: HeaderMessageType) => {
    setMessageData(messageData.filter((data) => data.title !== item.title));
  };

  return (
    <li className="onhover-dropdown" onClick={() => dispatch(setMessage(true))}>
      <div className="message">
        <SVG iconId="fill-message" />
        <span className="rounded-pill badge-secondary"> </span>
      </div>
      <div className={`onhover-show-div message-dropdown ${message ? "active" : ""}`}>
        <h6 className="f-18 mb-0 dropdown-title">{Message}</h6>
        <ul>
          {messageData.map((item, index) => (
            <li key={index}>
              <div className="d-flex align-items-start">
                <div className="message-img bg-light-primary">
                  <Image priority width={40} height={40} src={`${ImagePath}/user/${item.src}`} alt="image" />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1">
                    <Link href="/email/email_app">{item.title}</Link>
                  </h5>
                  <p>{item.tag}</p>
                </div>
                <div className="notification-right" onClick={() => handleDelete(item)}><X /></div>
              </div>
            </li>
          ))}
          <li>
            <Link className="f-w-700" href="/chat/private_chat">Check all</Link>
          </li>
        </ul>
      </div>
    </li>
  );
};
