import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserSuccessResponse } from "@/Types/ApiResponseType";
import { signin } from "@/app/actions/auth/signin";
import Cookies from "js-cookie";
import { signup } from "@/app/actions/auth/signup";
import { logout } from "@/app/actions/auth/logout";

interface UserState {
    user: UserSuccessResponse | null;
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string,
    successMessage: string,
}

const initialState: UserState = {
    user: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
};

// 🔹 Login İşlemi
export const loginUser = createAsyncThunk(
    "user/login",
    async (formData: FormData, thunkAPI) => {
        try {
            const response = await signin(formData);

            if ("errorMessage" in response) {
                return thunkAPI.rejectWithValue(response.errorMessage);
            } else {
                Cookies.set("token", response.data.accessToken);
                return response.data.user; // Başarılı girişte veriyi döndür
            }

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Something went wrong");
        }
    }

);

// 🔹 Register İşlemi
export const registerUser = createAsyncThunk(
    "user/register",
    async (
        formData: FormData,
        thunkAPI
    ) => {
        try {
            const response = await signup(formData)

            if ("errorMessage" in response) {
                return thunkAPI.rejectWithValue(response.errorMessage);
            }
            else {
                Cookies.remove("token");
                localStorage.clear();
                
                return response.data; // Başarılı girişte veriyi döndür
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// 🔹 Logout İşlemi
export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, thunkAPI) => {
        try {
            const response = await logout();

            if ("errorMessage" in response) {
                return thunkAPI.rejectWithValue(response.errorMessage);
            }

            Cookies.remove("token");
            localStorage.removeItem("user");
            return true; // Başarıyla çıkış yaptığında `true` döndür
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Something went wrong");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = ""
            state.successMessage = ""
        },
        clearState: (state) => {
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = ""
            state.successMessage = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isFetching = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isFetching = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isFetching = false;
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => {
                state.isFetching = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isFetching = false;
                state.isError = false;
                state.isSuccess = true;
                state.successMessage = action.payload as string;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isFetching = false;
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isFetching = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isFetching = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isFetching = false;
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
            });
    },
});

export const { setUser, clearUser,clearState } = userSlice.actions;
export default userSlice.reducer;
