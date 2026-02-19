

import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    message: "",
    type: "", 
  },
  reducers: {
    showPopup: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.message = "";
      state.type = "";
    },
  },
});

export const { showPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;

