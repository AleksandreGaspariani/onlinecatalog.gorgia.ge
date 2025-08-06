import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  crumbs: [],
  categoryName: null,
  categoryId: null,
  categories: [],
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.crumbs = action.payload
    },
    setCategoryInfo: (state, action) => {
      state.categoryName = action.payload.name
      state.categoryId = action.payload.id
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
  },
})

export const { setCategory, setCategoryInfo, setCategories } = categorySlice.actions
export default categorySlice.reducer