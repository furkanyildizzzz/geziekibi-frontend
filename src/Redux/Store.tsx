import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Reducers/CartSlice";
import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import ProductSlice from "./Reducers/ProductSlice";
import FilterSlice from "./Reducers/FilterSlice";

const Store = configureStore({
  reducer: {
    headerBookMark: HeaderBookmarkSlice,
    layout: LayoutSlice,
    product: ProductSlice,
    filterData: FilterSlice,
    cartData: CartSlice,
    themeCustomizer: ThemeCustomizerSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
