import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setContactsData } from "../redux/contactsSlice";
import { watchingError } from "../../utils/helpers";
import { useEffect } from "react";

import Breadcrumbs from "./Breadcrumbs";

export default function ContactInformation() {
  const navigate = useNavigate();
  const { contacts } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: contacts,
  });

  useEffect(() => {
    if (contacts) {
      Object.keys(contacts).forEach((key) => {
        setValue(key, contacts[key]);
      });
    }
  }, [contacts, setValue]);

  return (
    <div className="contact-information-section">
      <div className="container">
        <Breadcrumbs location={location.pathname} isValid={isValid} />

        <h2 className="title">Contact information</h2>

        <form
          onSubmit={handleSubmit((data) => {
            dispatch(setContactsData(data));
            navigate("/shipment-information");
          })}
          action=""
          className="form"
        >
          <div className="white-wrapper">
            <div className="field-combine-container">
              <div className="input-container">
                <label className="input-label" htmlFor="firstName">
                  First name*
                  <input
                    {...register("firstName", {
                      required: "This is required",
                      pattern: {
                        value: /^[A-Za-zА-Яа-я]+$/i,
                        message: "Alphabets only",
                      },
                      minLength: {
                        value: 3,
                        message: "Name is too short",
                      },
                    })}
                    className={`text-input ${errors.firstName ? "error" : ""}`}
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                  />
                </label>
                {watchingError(errors.firstName?.message)}
              </div>
              <div className="input-container">
                <label className="input-label" htmlFor="lastName">
                  Last name*
                  <input
                    {...register("lastName", {
                      required: "This is required",
                      pattern: {
                        value: /^[A-Za-zА-Яа-я]+$/i,
                        message: "Alphabets only",
                      },
                      minLength: {
                        value: 3,
                        message: "Last name is too short",
                      },
                    })}
                    className={`text-input ${errors.lastName ? "error" : ""}`}
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                  />
                </label>
                {watchingError(errors.lastName?.message)}
              </div>
            </div>
            <div className="field-combine-container">
              <div className="input-container">
                <label className="input-label" htmlFor="email">
                  Email*
                  <input
                    {...register("email", {
                      required: "This is required",
                      pattern: {
                        value:
                          /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`text-input ${errors.email ? "error" : ""}`}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </label>
                {watchingError(errors.email?.message)}
              </div>
              <div className="input-container">
                <label className="input-label" htmlFor="phone">
                  Phone*
                  <input
                    {...register("phone", {
                      required: "This is required",
                      pattern: {
                        value: /^\+?[\d\s\-\(\)]{10,20}$/i,
                        message: "Not valid number",
                      },
                      minLength: {
                        value: 10,
                        message: "Phone number is too short",
                      },
                      maxLength: {
                        value: 13,
                        message: "Phone number is too long",
                      },
                    })}
                    className={`text-input ${errors.phone ? "error" : ""}`}
                    type="number"
                    id="phone"
                    placeholder="Enter your phone"
                  />
                </label>
                {watchingError(errors.phone?.message)}
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
