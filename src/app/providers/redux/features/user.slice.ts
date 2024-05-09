import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../interfaces/user.state.interface";

const initialState: UserState = {
  id: "",
  name: "",
  onlineUsers: new Set<string>(),
  invitations: new Set<string>()
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
      state.onlineUsers = new Set(action.payload);
    },

    addInvitation: (state, action: PayloadAction<string>) => {
      state.invitations.add(action.payload);
    }
  }
});

export default userSlice.reducer;
export const { setId, setName, setOnlineUsers, addInvitation } = userSlice.actions;