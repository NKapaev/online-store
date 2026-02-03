import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductsSection from "./components/ProductsSection";
import CartPage from "./components/CartPage";
import ContactInformation from "./components/ContactInformation";
import ShipmentInformation from "./components/ShipmentInformation";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <>
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<ProductsSection />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact-information" element={<ContactInformation />} />
          <Route
            path="/shipment-information"
            element={<ShipmentInformation />}
          />
          <Route path="/result-page" element={<ResultPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
