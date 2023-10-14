import { configureStore } from "@reduxjs/toolkit";
import posters from "./postersRedux";

export const store = configureStore({
  reducer: { posters },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
