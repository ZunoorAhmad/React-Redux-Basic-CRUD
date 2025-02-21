import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
    "users/fetchUsers",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch("https://67b861f3699a8a7baef3dade.mockapi.io/crud", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to fetch users");
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUsers = createAsyncThunk(
    "users/showUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("https://67b861f3699a8a7baef3dade.mockapi.io/crud");
            if (!response.ok) throw new Error("Failed to fetch users");
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://67b861f3699a8a7baef3dade.mockapi.io/crud/${userId}`,
                {
                    method: "Delete",
                }
            );
            if (!response.ok) throw new Error("Failed to fetch users");
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "updateUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://67b861f3699a8a7baef3dade.mockapi.io/crud/${user.id}`,
                {
                    method: "Put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                }
            );
            if (!response.ok) throw new Error("Failed to fetch users");
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUserLocally: (state, action) => {
            const { id, name, email } = action.payload;
            const user = state.users.find((user) => user.id === id);
            if (user) {
                user.name = name;
                user.email = email;
            }
        },
        deleteUserLocally: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.users = state.users.filter((ele) => ele.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id, name, email } = action.payload;
                const user = state.users.find((user) => user.id === id);
                if (user) {
                    user.name = name;
                    user.email = email;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { deleteUserLocally, addUser, updateUserLocally } = userSlice.actions;
export default userSlice.reducer;
