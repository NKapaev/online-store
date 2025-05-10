import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Breadcrumbs({ location, isValid }) {
  const { cart } = useSelector((state) => state.cart);
  const { contacts } = useSelector((state) => state.contacts);

  return (
    <nav className="nav">
      <ul className="breadcrumbs list">
        <li className="breadcrumbs-item">
          <NavLink className="breadcrumbs-link link" to={"/cart"}>
            Cart
          </NavLink>
        </li>
        <li className="breadcrumbs-item">
          <NavLink
            className={`breadcrumbs-link link
                ${
                  location === "/cart"
                    ? cart.length === 0
                      ? "disabled"
                      : ""
                    : ""
                }
                 `}
            to={"/contact-information"}
          >
            Contact information
          </NavLink>
        </li>
        <li className="breadcrumbs-item">
          <NavLink
            className={`breadcrumbs-link link ${
              (location === "/cart"
                ? cart.length === 0 ||
                  !contacts.firstName ||
                  !contacts.lastName ||
                  !contacts.email ||
                  !contacts.phone
                  ? "disabled"
                  : ""
                : "") ||
              (location === "/contact-information"
                ? !isValid
                  ? "disabled"
                  : ""
                : "")
            }`}
            to={"/shipment-information"}
          >
            Shipment information
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
