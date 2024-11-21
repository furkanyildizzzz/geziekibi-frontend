import { AddProductSliceType } from "@/Types/EcommerceType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AddProductSliceType = {
  navId: 1,
  tabId: 1,
  isLoading: false,
  formValue: {
    copyTourId: 0,
    id: 0,
    title: "",
    spot: "",
    body: "",
    primaryImages: [],
    galleryImages: [],
    uploadedPrimaryImages: [],
    uploadedGalleryImages: [],
    category: "",
    tourType: "",
    publishStatus: "",
    publishDate: "",
    startDate: "",
    endDate: "",
    prices: [],
    currency: "",
    tags: [],
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFormValue: (state, action) => {
      state.formValue[action.payload.name] = action.payload.value;
    },
    resetTourForm: (state, action) => {
      state.formValue = {
        copyTourId: 0,
        id: 0,
        title: "",
        spot: "",
        body: "",
        primaryImages: [],
        galleryImages: [],
        uploadedPrimaryImages: [],
        uploadedGalleryImages: [],
        category: "",
        tourType: "yurtici",
        publishStatus: "publish",
        publishDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        prices: [],
        currency: "",
        tags: [],
        tourServices: [],
      };
    },
  },
});
export const { setNavId, setFormValue, setTabId, setIsLoading, resetTourForm } =
  AddProductSlice.actions;

export default AddProductSlice.reducer;
