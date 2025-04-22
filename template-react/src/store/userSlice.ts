import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentUser: API.UserVO | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<API.UserVO | null>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = !!action.payload;
      state.isAdmin = action.payload?.userRole === 'admin';
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;

export default userSlice.reducer; 