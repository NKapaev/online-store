import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setShipmentData } from "../redux/contactsSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { watchingError } from "../../utils/helpers";
import Breadcrumbs from "./Breadcrumbs";

export default function ShipmentInformation() {
  const { shipment } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: shipment,
  });

  useEffect(() => {
    if (shipment) {
      Object.keys(shipment).forEach((key) => {
        setValue(key, shipment[key]);
      });
    }
  }, [shipment, setValue]);

  return (
    <div className="shipmant-information-section">
      <div className="container">
        <Breadcrumbs location={location.pathname} isValid={isValid} />

        <h2 className="title">Shipment information</h2>

        <form
          onSubmit={handleSubmit((data) => {
            dispatch(setShipmentData(data));
            navigate("/result-page");
          })}
          action=""
          className="form"
        >
          <div className="white-wrapper">
            <div className="one-field-per-row-container">
              <div className="input-container">
                <label className="input-label" htmlFor="address">
                  Address (No P. O. Boxes)*
                  <input
                    {...register("address", {
                      required: "This is required",
                      pattern: {
                        value:
                          /^(?!.*(P\.?O\.?\s?Box|Post\s?Office\s?Box))^[a-zA-Zа-яА-Я0-9\s.,'-]+$/i,
                        message:
                          "Invalid address format or P.O. Boxes are not allowed",
                      },
                      minLength: {
                        value: 3,
                        message: "Address is too short",
                      },
                    })}
                    className={`text-input ${errors.address ? "error" : ""}`}
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                  />
                </label>
                {watchingError(errors.address?.message)}
              </div>

              <div className="input-container">
                <label className="input-label" htmlFor="apartment">
                  Apartment, suite etc. (optional)
                  <input
                    {...register("apartment", {
                      pattern: {
                        value: /^[A-Za-zА-Яа-я0-9]+$/i,
                        message: "Not valid apartment value",
                      },
                    })}
                    className={`text-input ${errors.apartment ? "error" : ""}`}
                    type="text"
                    id="apartment"
                    placeholder="Enter your apartment information"
                  />
                </label>
                {watchingError(errors.apartment?.message)}
              </div>

              <div className="input-container">
                <label className="input-label" htmlFor="city">
                  City*
                  <input
                    {...register("city", {
                      required: "This is required",
                      pattern: {
                        value: /^[A-Za-zА-Яа-яЁёІі]+$/i,
                        message: "Alphabets only",
                      },
                      minLength: {
                        value: 3,
                        message: "Name is too short",
                      },
                    })}
                    className={`text-input ${errors.city ? "error" : ""}`}
                    type="text"
                    id="city"
                    placeholder="Enter your city"
                  />
                </label>
                {watchingError(errors.city?.message)}
              </div>
            </div>

            <div className="three-fields-per-row-container">
              <div className="input-container">
                <label className="input-label" htmlFor="">
                  Country/Region*
                  <div className="select-container">
                    <select
                      {...register("country", {
                        required: "This is required",
                        validate: (value) => value !== "" || "This is required",
                      })}
                      className={`text-input shipment-select ${errors.country ? "error" : ""
                        }`}
                      name="country"
                      id="country"
                    >
                      <option value="" disabled selected>
                        Select your country/region
                      </option>
                      <option value="country1">Country1</option>
                      <option value="country2">Country2</option>
                      <option value="country3">Country3</option>
                    </select>
                    <img
                      className="drop-icon"
                      src="./images/drop-icon.svg"
                      alt="Drop icon"
                    />
                  </div>
                </label>
                {watchingError(errors.country?.message)}
              </div>
              <div className="input-container">
                <label className="input-label" htmlFor="state">
                  State*
                  <div className="select-container">
                    <select
                      {...register("state", {
                        required: "This is required",
                        validate: (value) => value !== "" || "This is required",
                      })}
                      className={`text-input shipment-select ${errors.state ? "error" : ""
                        }`}
                      name="state"
                      id="state"
                    >
                      <option value="" selected disabled>
                        Select your state
                      </option>
                      <option value="state1">State1</option>
                      <option value="state2">State2</option>
                      <option value="state3">State3</option>
                    </select>
                    <img
                      className="drop-icon"
                      src="./images/drop-icon.svg"
                      alt="Drop icon"
                    />
                  </div>
                </label>
                {watchingError(errors.state?.message)}
              </div>

              <div className="input-container">
                <label className="input-label" htmlFor="zip-code">
                  ZIP code*
                  <input
                    {...register("zipCode", {
                      required: "This is required",
                      pattern: {
                        value: /^[0-9]+$/i,
                        message: "Numbers only",
                      },
                      minLength: {
                        value: 4,
                        message: "Zip-code is too short",
                      },
                    })}
                    className={`text-input ${errors.zipCode ? "error" : ""}`}
                    type="text"
                    id="zip-code"
                    placeholder="Enter your ZIP code"
                  />
                </label>
                {watchingError(errors.zipCode?.message)}
              </div>
            </div>
          </div>
          <button className={`button next-step-button`} type="submit">
            Next step
          </button>
        </form>
      </div>
    </div>
  );
}
