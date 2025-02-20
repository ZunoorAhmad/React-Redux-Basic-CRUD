import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name: "users",
    initialState: [
        {
            name: "Hello User",
            email: "hello@user.com",
            id: 1
        }
    ],
    reducers: {

        addUser: (state, action) => {
            console.log(state);
            console.log(action);
            state.push(action.payload);
        },

        updateUser: (state, action) => {
            console.log("Update Reducer working");
            const { id, name, email } = action.payload;
            const user = state.find(user => user.id === id);
            if (user) {
                user.name = name;
                user.email = email;
            }
        },

        deleteUser: (state, action) => {
            const { id } = action.payload;
            return state.filter((user) => user.id !== id);
        }
    }

});

export const { deleteUser, addUser, updateUser } = userSlice.actions
export default userSlice.reducer
