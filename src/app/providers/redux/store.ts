import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user.slice";
import chatSlice from "./features/chat.slice";

const rootReducer = combineReducers({
  "user": userSlice,
  "chat": chatSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;