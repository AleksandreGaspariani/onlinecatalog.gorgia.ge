import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  crumbs: [],
}

const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumbs: (state, action) => {
      state.crumbs = action.payload
    },
    clearBreadcrumbs: (state) => {
      state.crumbs = []
    },
  },
})

export const { setBreadcrumbs, clearBreadcrumbs } = breadcrumbSlice.actions
export default breadcrumbSlice.reducer
