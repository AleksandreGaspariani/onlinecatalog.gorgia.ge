import { createSlice } from '@reduxjs/toolkit'

const getInitialTab = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('admin_selectedTab') || 'categories'
    }
    return 'categories'
}

const initialState = {
    selectedTab: getInitialTab(),
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setSelectedTab(state, action) {
            state.selectedTab = action.payload
            if (typeof window !== 'undefined') {
                localStorage.setItem('admin_selectedTab', action.payload)
            }
        },
    },
})

export const { setSelectedTab } = adminSlice.actions
export default adminSlice.reducer
