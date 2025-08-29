import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    role: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.role = action.payload?.role || null;
        },
        logout(state) {
            state.user = null;
            state.role = null;
            localStorage.removeItem('authToken'); // Remove token on logout
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
