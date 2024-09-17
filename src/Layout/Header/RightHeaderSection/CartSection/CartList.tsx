"use client";
import { CartQuantityButton } from "@/Components/Applications/Ecommerce/Cart/CartQuantityButton";
import { Href, ImagePath } from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { removeCartData } from "@/Redux/Reducers/CartSlice";
import { CartType } from "@/Types/EcommerceType";
import { getallCardTotal } from "@/utils/Ecommerce.service";
import FeatherIcons from "@/utils/FeatherIcons";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Col } from "reactstrap";

export const CartList = () => {
  const dispatch = useAppDispatch();
  const { symbol } = useAppSelector((state) => state.product);
  const { cart } = useAppSelector((state) => state.cartData);
  const removefromcart = (item: CartType) => dispatch(removeCartData(item.id));

  return (
    <ul>
      {cart.length > 0 ? (
        <Fragment>
          {cart.map((data, index) => (
            <Fragment key={index}>
              <li>
                <div className='d-flex'>
                <Image width={40} height={40} className="img-fluid b-r-5 me-3 img-60" src={`${ImagePath}/ecommerce/${data.image}`} alt={Href} priority />
                  <div className='flex-grow-1'>
                    <span>{data.name}</span>
                    <div className='qty-box'>
                      <CartQuantityButton item={data} />
                    </div>
                    <h6 className=' -primary'>${data.price}</h6>
                  </div>
                  <div className='close-circle' onClick={() => removefromcart(data)}>
                    <Link className='bg-danger' href={Href}>
                      <FeatherIcons iconName='X' />
                    </Link>
                  </div>
                </div>
              </li>
            </Fragment>
          ))}
          <li className='total'>
            <h6 className='mb-0'>
              {"OrderTotal"} :
              <span className='f-right'>
                {symbol}
                {getallCardTotal(cart)}
              </span>
            </h6>
          </li>
          <li className='text-center'>
            <Link className='d-block mb-3 view-cart f-w-700' href={`/ecommerce/cart`}>
              {"GoToYourCart"}
            </Link>
            <Link className='btn btn-primary view-checkout' href={`/ecommerce/checkout`}>
              {"Checkout"}
            </Link>
          </li>
        </Fragment>
      ) : (
        <Col sm={12} className='empty-cart-cls text-center'>
          <Image height={172} width={172} src={`${ImagePath}/ecommerce/icon-empty-cart.png`} className='img-fluid mb-4 mt-4' alt='Empty Cart' />
          <h3>
            <strong>Your Cart is Empty</strong>
          </h3>
          <h4>Add something to make me happy</h4>
          <Link className='btn btn-primary cart-btn-transform m-t-15 mb-4' href={Href}>
            continue shopping
          </Link>
        </Col>
      )}
    </ul>
  );
};
