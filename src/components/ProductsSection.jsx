import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { fetchProducts } from "../redux/productsSlice";

const ProductCard = memo(({ product }) => {
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <li className="card-item">
      <img className="card-image" src={product.images[0]} alt={product.title} />
      <h3 className="card-title">{product.title}</h3>
      <p className="card-price">${product.price}</p>
      <button onClick={handleAddToCart} className="button add-to-cart-button">
        {added ? (
          <>
            <img
              src="/images/check-icon.svg"
              alt="Added"
              className="button-icon"
            />{" "}
            Added!
          </>
        ) : (
          <>
            <img
              src="/images/plus-icon.svg"
              alt="Add to cart"
              className="button-icon"
            />{" "}
            Add to cart
          </>
        )}
      </button>
    </li>
  );
});

export default function ProductsSection() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const productsList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <div className="products-section">
      <div className="container products-container">
        {status === "loading" && <p>Loading products...</p>}
        {status === "failed" && <p>Error loading products</p>}
        <ul className="products-list list">{productsList}</ul>
      </div>
    </div>
  );
}
