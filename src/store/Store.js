import { configureStore } from "@reduxjs/toolkit";
import UserSlice from '../redux/UserReducer.js'
const store = configureStore({

    reducer: {
        users: UserSlice
    }

})

export default store