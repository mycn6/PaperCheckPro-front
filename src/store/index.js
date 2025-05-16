import { configureStore } from '@reduxjs/toolkit'
import paperReducer from './modules/paperStore.js'
import papercnReducer from './modules/papercnStore.js'
const store = configureStore({
    reducer: {
        paper: paperReducer,
        papercn:papercnReducer
    }
})
export default store