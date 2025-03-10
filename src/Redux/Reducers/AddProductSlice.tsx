import { AddProductSliceType } from "@/Types/EcommerceType";
import { createSlice } from "@reduxjs/toolkit";
import { isSameDay, startOfDay } from "date-fns";

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
    tourDates: [{}],
    currency: "",
    tags: [],
    tourServices: [],
    dailyForms: [{}],
    importantNotes: "",
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
        dailyForms: [
          {
            id: 0,
            breakfeast: "",
            lunch: "",
            dinner: "",
            description: "",
            dailyPaths: [],
            dailyVisitingPlaces: [],
          },
        ],
        tourDates: [
          {
            id: 0,
            isActive: true,
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            prices: [],
          },
        ],
        importantNotes: "",
      };
    },
    updateDailyForm: (state, action) => {
      const { index, fieldName, value } = action.payload;
      // Ensure dailyForms array exists
      if (!state.formValue.dailyForms) {
        state.formValue.dailyForms = [];
      }

      // Ensure the object at the given index exists
      if (!state.formValue.dailyForms[index]) {
        state.formValue.dailyForms[index] = {}; // Initialize as an empty object
      }

      // Update the specific field
      state.formValue.dailyForms[index][fieldName] = value;
    },
    updateDatePriceList: (state, action) => {
      const { targetDate, priceList } = action.payload;

      console.log({ targetDate, priceList });
      // Find the target date
      const dateIndex = state.formValue.tourDates.findIndex((d: any) =>
        isSameDay(d.startDate, targetDate)
      );

      if (dateIndex !== -1) {
        // Update the priceList for the matched date
        state.formValue.tourDates[dateIndex] = {
          ...state.formValue.tourDates[dateIndex],
          prices: priceList,
        };
      } else {
        console.error("Date not found for updating price list");
      }
    },
  },
});
export const {
  setNavId,
  setFormValue,
  setTabId,
  setIsLoading,
  resetTourForm,
  updateDailyForm,
  updateDatePriceList,
} = AddProductSlice.actions;

export default AddProductSlice.reducer;
