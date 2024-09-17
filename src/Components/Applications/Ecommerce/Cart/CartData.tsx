import { Row, Table } from "reactstrap";
import { Href, ImagePath } from "@/Constant/constant";
import EmptyCart from "./EmptyCart";
import { XCircle } from "react-feather";
import { CartTableHead } from "./CartTableHead";
import { CartQuantityButton } from "./CartQuantityButton";
import CartAction from "./CartAction";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { CartType } from "@/Types/EcommerceType";
import { removeCartData } from "@/Redux/Reducers/CartSlice";
import Image from "next/image";

export const CartData = () => {
  const dispatch = useAppDispatch();
  const { symbol } = useAppSelector((state) => state.product);
  const { cart } = useAppSelector((state) => state.cartData);
  const removeFromCart = (item: CartType) => dispatch(removeCartData(item.id));

  return (
    <>
      {cart && cart.length > 0 ? (
        <Row>
          <div className="order-history custom-scrollbar table-responsive wishlist">
            <Table className="table-bordered">
              <CartTableHead />
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td><Image width={40} height={40} className="img-fluid img-40" src={`${ImagePath}/ecommerce/${item.image}`} alt={Href} priority /></td>
                    <td><div className="product-name"><a href={Href}>{item.name}</a></div></td>
                    <td>{symbol}{item.price}</td>
                    <CartQuantityButton item={item} />
                    <td><a href={Href} onClick={() => removeFromCart(item)}><XCircle /></a></td>
                    <td>{symbol}{item.price * item.total}</td>
                  </tr>
                ))}
                <CartAction/>
              </tbody>
            </Table>
          </div>
        </Row>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
