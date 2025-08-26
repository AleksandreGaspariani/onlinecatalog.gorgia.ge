import { configureStore } from '@reduxjs/toolkit'
import breadcrumbReducer from './breadcrumbSlice'
import categoryReducer from './categorySlice'

const store = configureStore({
  reducer: {
    breadcrumb: breadcrumbReducer,
    category: categoryReducer,
  },
})

export default store
