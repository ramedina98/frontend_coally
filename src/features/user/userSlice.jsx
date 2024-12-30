import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// base URL...
const API_URL = import.meta.env.VITE_API_URL_USER;

// Estado inicial
const initialState = {
    info: {},
    loading: false,
    error: null,
};

export const getUserInfo = createAsyncThunk("user/getUserInfo", async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${API_URL}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data; // Devuelve los datos del usuario
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al obtener los datos del usuario"
            );
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload; // Guardar la información del usuario
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Guardar el error
            });
    },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;