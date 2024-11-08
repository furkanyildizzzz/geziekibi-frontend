import { AddProductSliceType } from "@/Types/EcommerceType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AddProductSliceType = {
  navId: 1,
  tabId: 1,
  formValue: {
    title: "",
    spot: "",
    body: "",
    image: [],
    gallery: [],
    category: "",
    publishStatus: "",
    publishDate: "",
    initialCost: "",
    price: "",
    currency: "",
    tags: "",
    tourServices: [],
  },
};

const AddProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    setNavId: (state, action) => {
      state.navId = action.payload;
    },
    setTabId: (state, action) => {
      state.tabId = action.payload;
    },
    setFormValue: (state, action) => {
      state.formValue[action.payload.name] = action.payload.value;
    },
  },
});
export const { setNavId, setFormValue, setTabId } = AddProductSlice.actions;

export default AddProductSlice.reducer;
