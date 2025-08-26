import { configureStore } from '@reduxjs/toolkit'
import breadcrumbReducer from './breadcrumbSlice'
import categoryReducer from './categorySlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    breadcrumb: breadcrumbReducer,
    category: categoryReducer,
    user: userReducer,
  },
})

export default store
