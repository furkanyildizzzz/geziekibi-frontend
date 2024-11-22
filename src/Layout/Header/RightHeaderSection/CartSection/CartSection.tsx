"use client";
import SVG from "@/Components/SVG/Svg";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setCart } from "@/Redux/Reducers/HeaderBookmarkSlice";
import Link from "next/link";
import { CartList } from "./CartList";

export const CartSection = () => {
  const { cart } = useAppSelector((state) => state.headerBookMark);
  const dispatch = useAppDispatch();

  const handleCart = () => {
    dispatch(setCart(true));
  };

  return (
    <li className="cart-nav onhover-dropdown" onClick={handleCart}>
      <div className="cart-box">
        <SVG iconId="fill-Buy" />
      </div>
      <div className={`cart-dropdown onhover-show-div ${cart ? "active" : ""}`}>
        <h6 className="f-18 mb-0 dropdown-title">Cart</h6>
        <ul>
          <CartList />
        </ul>
      </div>
    </li>
  );
};
