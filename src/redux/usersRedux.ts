import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Users {
  username: string;
  email: string;
  password: string;
}

interface ForLogin {
  login: boolean;
}

interface UsersState extends ForLogin {
  users: Users[];
  loginUser: Users;
}

const initialState: UsersState = {
  users: [{ username: "oskar", password: "123", email: "123" }],
  loginUser: {
    username: "",
    email: "",
    password: "",
  },
  login: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    loadUsers(state, action: PayloadAction<Users[]>) {
      state.users = action.payload;
    },
    uploadUser(state, action: PayloadAction<Users>) {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginUser(state, action: PayloadAction<boolean>) {
      state.login = action.payload;
    },
  },
});

export const { loadUsers, uploadUser, loginUser } = usersSlice.actions;
export default usersSlice.reducer;
