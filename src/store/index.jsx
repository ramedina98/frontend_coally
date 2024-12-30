import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import tasksReducer from '../features/tasks/taskSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
        user: userReducer
    },
});

export default store;