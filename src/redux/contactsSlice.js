import { createSlice } from "@reduxjs/toolkit";
import { orderDateGenerator } from "../../utils/helpers";

const initialState = {
  contacts: {},
  shipment: {},
  orderId: "",
  orderDate: {},
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContactsData: (state, action) => {
      state.contacts.firstName = action.payload.firstName;
      state.contacts.lastName = action.payload.lastName;
      state.contacts.email = action.payload.email;
      state.contacts.phone = action.payload.phone;
    },

    setShipmentData: (state, action) => {
      state.shipment.address = action.payload.address;
      state.shipment.apartment = action.payload.apartment;
      state.shipment.city = action.payload.city;
      state.shipment.country = action.payload.country;
      state.shipment.state = action.payload.state;
      state.shipment.zipCode = action.payload.zipCode;
      state.orderId = Date.now();
      state.orderDate = orderDateGenerator(Date());
    },
    resetContacts: (state) => initialState,
  },
});

export const { setContactsData, setShipmentData, resetContacts } =
  contactsSlice.actions;
export default contactsSlice.reducer;
