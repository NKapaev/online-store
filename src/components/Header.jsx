import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { calcTotalProductsQuantity } from "../../utils/helpers";
import { resetCart } from "../redux/cartSlice";
import { resetContacts } from "../redux/contactsSlice";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  let productsQuantity = calcTotalProductsQuantity(cart);
  return (
    <div className="header">
      <div className="container header-container">
        <Link
          className="logo-link"
          to="/"
          onClick={(event) => {
            if (location.pathname === "/result-page") {
              event.preventDefault(); // Останавливаем переход
              dispatch(resetCart());
              dispatch(resetContacts());
              navigate("/"); // После очистки вручную переходим на главную
            }
          }}
        >
          <img className="logo-icon" src="./images/logo.svg" alt="Logo" />
        </Link>

        <Link className="cart-link link" to={"/cart"}>
          <span
            className={`cart-link-button-output ${productsQuantity === 0 || location.pathname !== "/"
              ? "hidden"
              : ""
              }`}
          >{`${cart.length !== 0 ? productsQuantity : ""}`}</span>
          <img
            src="./images/cart-icon.svg"
            alt="Cart icon"
            className="cart-icon"
          />
          Cart
        </Link>
      </div>
    </div>
  );
}
