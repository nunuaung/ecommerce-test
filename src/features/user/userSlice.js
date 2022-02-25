import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload;
      console.log("payload action ", state.users);
    },
    loadUser: (state, action) => {
      state.users = action.payload;
    },
    loginUser: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("username", JSON.stringify(state.users.username));
      localStorage.setItem("password", JSON.stringify(state.users.password));
    },
  },
});

export const selectUsers = (state) => state.user.users;
export const { addUser, loadUser, loginUser } = userSlice.actions;

export default userSlice.reducer;
