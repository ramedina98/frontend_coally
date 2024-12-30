import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// base URL...
const API_URL = import.meta.env.VITE_API_URL_AUTH;

const initialState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    users: [],
    emails: [],
    isLoading: false,
    error: null,
    message: null,
};

export const getUsers = createAsyncThunk('auth/', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk('auth/login/', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login/`,
            {username: credentials.user_name, password: credentials.password},
            { withCredentials: true });
        const { accessToken, message } = response.data;

        // storage the token...
        localStorage.setItem("accessToken", accessToken);

        return { accessToken, message };
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data.message); // Maneja el mensaje de error del backend
        }
        return thunkAPI.rejectWithValue("Error desconocido, intente de nuevo más tarde.");
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
            `${API_URL}/logout/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }
        );

        localStorage.removeItem("accessToken");
        return response.data.message;
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Error desconocido al cerrar sesión.");
    }
});

export const registerUser = createAsyncThunk("/auth/new-user/", async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/new-user/`, { user_data: userData });

        const { message } = response.data;

        return message;
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Error desconocido durante el registro.");
    }
});

export const recoverPassword = createAsyncThunk("auth/recover-password", async (userName, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/recover-password/`, { user_name: userName });

        const { message } = response.data;

        return message;
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Error desconocido durante la recuperación de contraseña.");
    }
});

export const resetPassword = createAsyncThunk("auth/reset-forgoten-password", async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/reset-forgoten-password/`, { token: data.token, newPass: data.newPass });
            return response.data.message;
        } catch (error) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Error desconocido durante el restablecimiento de contraseña.");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Obtener usuarios
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data.usernames;
                state.emails = action.payload.data.emails;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.accessToken = action.payload.accessToken;
                state.message = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.accessToken = null;
                state.message = action.payload;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Registro de usuario
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Recuperación de contraseña
            .addCase(recoverPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(recoverPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(recoverPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Restablecimiento de la contraseña
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;