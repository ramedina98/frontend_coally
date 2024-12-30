import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// base URL...
const API_URL = import.meta.env.VITE_API_URL_TASK;

// Estado inicial
const initialState = {
    tasks: [],
    loading: false,
    error: null,
    change: 0,
};

export const createNewTask = createAsyncThunk("task/createNewTask", async (data, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(`${API_URL}/new-task/`,
                { title: data.title, description: data.description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.task;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error al crear la tarea");
        }
    }
);

export const getTasks = createAsyncThunk("tasks/getTasks", async ( status , { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${API_URL}/`, {
                params: { status },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.tasks;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error al obtener las tareas");
        }
    }
);

export const getTask = createAsyncThunk("tasks/getTask", async ({ id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.task;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error al obtener la tarea");
        }
    }
);

export const updateATask = createAsyncThunk("tasks/updateATask", async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.put(
                `${API_URL}/update-task/${id}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.updatedTask)
            return response.data.updatedTask;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al actualizar la tarea"
            );
        }
    }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`${API_URL}/delete-task/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al eliminar la tarea"
            );
        }
    }
);



const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Caso pendiente
            .addCase(createNewTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Caso cumplido
            .addCase(createNewTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            // Caso rechazado
            .addCase(createNewTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Caso pendiente de getTasks
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Caso cumplido de getTasks
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            // Caso rechazado de getTasks
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTask = action.payload;
            })
            .addCase(getTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Caso pendiente
            .addCase(updateATask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Caso cumplido
            .addCase(updateATask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.tasks.findIndex(
                    (task) => task.id === action.payload.id
                );
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                    state.change += 1;
                }
            })
            // Caso rechazado
            .addCase(updateATask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Caso pendiente
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Caso cumplido
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                // Eliminamos la tarea del estado
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            // Caso rechazado
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = tasksSlice.actions;

export default tasksSlice.reducer;