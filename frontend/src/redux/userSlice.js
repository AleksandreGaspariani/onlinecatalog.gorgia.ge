import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch {
        return null;
    }
};

const getInitialRole = () => {
    const user = getInitialUser();
    return user?.role || null;
};

const initialState = {
    user: getInitialUser(),
    role: getInitialRole(),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.role = action.payload?.role || null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state) {
            state.user = null;
            state.role = null;
            localStorage.removeItem('user');
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;