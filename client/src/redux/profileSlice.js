import { createSlice } from "@reduxjs/toolkit";

const initialState = { auth: true, user: {} };

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.auth = action.payload.status;
      state.user = action.payload.data;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
