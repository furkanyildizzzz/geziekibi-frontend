import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CartSlice from "./Reducers/CartSlice";
import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import ProductSlice from "./Reducers/ProductSlice";
import FilterSlice from "./Reducers/FilterSlice";
import AddProductSlice from "./Reducers/AddProductSlice";
import UserSlice from "./Reducers/UserSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // `localStorage` kullanır

// 🔹 Sadece user reducer'ı persist etmek için konfigürasyon
const userPersistConfig = {
  key: "user",
  storage, // `localStorage` kullanacak
};

// 🔹 Root Reducer oluştur
const rootReducer = combineReducers({
  headerBookMark: HeaderBookmarkSlice,
  layout: LayoutSlice,
  product: ProductSlice,
  filterData: FilterSlice,
  cartData: CartSlice,
  themeCustomizer: ThemeCustomizerSlice,
  addProduct: AddProductSlice,
  user: persistReducer(userPersistConfig, UserSlice), // Sadece user persist edilecek
});

// 🔹 Store'u oluştur
const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// 🔹 Persistor'u oluştur
export const persistor = persistStore(Store);

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
