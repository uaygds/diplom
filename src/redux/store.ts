import { configureStore } from "@reduxjs/toolkit";
import posters from "./postersRedux";
import users from "./usersRedux";

export const store = configureStore({
  reducer: { posters, users },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
