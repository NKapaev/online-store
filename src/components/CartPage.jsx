import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decrementProductCounter,
  incrementProductCounter,
  removeFromCart,
} from "../redux/cartSlice";
import Breadcrumbs from "./Breadcrumbs";
import { calcTotalPrice, calcTotalProductsQuantity } from "../../utils/helpers";
import { useLocation } from "react-router-dom";

export default function CartPage() {
  const location = useLocation();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const cartItems = cart.map(({ id, images, title, price, counter }) => {
    return (
      <li className="cart-item" key={id}>
        <div className="cart-image-container">
          <img src={images[0]} alt={title} />
        </div>
        <div className="cart-item-description-container">
          <div className="description-top">
            <h3 className="cart-title">{title}</h3>
            <button
              onClick={() => {
                dispatch(removeFromCart(id));
              }}
              className="delete-cart-button button"
            >
              <img
                className="delete-button-icon"
                src="./images/trash-icon.svg"
                alt="Trash icon"
              />
              Delete
            </button>
          </div>
          <div className="description-bottom">
            <div className="counter-controlls">
              <button
                onClick={() => {
                  dispatch(decrementProductCounter(id));
                }}
                className="button counter-control-button"
                disabled={counter === 1}
              >
                -
              </button>
              <p className="product-counter-output">{counter}</p>
              <button
                onClick={() => {
                  dispatch(incrementProductCounter(id));
                }}
                className="button counter-control-button"
              >
                +
              </button>
            </div>

            <p className="price">
              Price:
              <span className="price-value">
                ${(price * counter).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </li>
    );
  });

  return (
    <section className="cart-section">
      <div className="container">
        <Breadcrumbs location={location.pathname} />

        <h2 className="title">Cart</h2>

        <ul className="cart-list list">{cartItems}</ul>

        <div className="total-container">
          <div className="total-keys">
            <p className="total-key">Together:</p>
            <p className="total-key">Sum:</p>
          </div>
          <div className="total-values">
            <p className="total-value">
              {calcTotalProductsQuantity(cart)} products.
            </p>
            <p className="total-value">${calcTotalPrice(cart)}</p>
          </div>
        </div>
        <Link
          className={`button link next-step-button ${
            cart.length === 0 ? "disabled" : ""
          }`}
          to={"/contact-information"}
        >
          Next step
        </Link>
      </div>
    </section>
  );
}
