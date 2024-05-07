import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../interfaces/user.state.interface";

const initialState: UserState = {
  id: "",
  name: "",
  onlineUsers: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    }
  }
});

export default userSlice.reducer;
export const { setId, setName, setOnlineUsers } = userSlice.actions;