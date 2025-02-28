import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserSuccessResponse } from "@/Types/ApiResponseType";
import { signin } from "@/app/actions/auth/signin";
import Cookies from "js-cookie";
import { persistor } from "../Store";

interface UserState {
    user: UserSuccessResponse | null;
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string,
}

const initialState: UserState = {
    user: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
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
        { email, password, name }: { email: string; password: string; name: string },
        thunkAPI
    ) => {
        try {
            const response = await fetch(
                "https://mock-user-auth-server.herokuapp.com/api/v1/register",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password, name }),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message || "Registration failed");
            }

            return data; // Başarılı kayıt verisini döndür
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
            persistor.purge()
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
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isFetching = false;
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
            });
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
