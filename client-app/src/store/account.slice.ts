import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const accountSlice: any = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// export const getUser = () => async (dispatch: any) => {
//   try {

//   } catch (err:any) {
//     throw new Error(err);
//   }
// };

export const { setUser } = accountSlice.actions;

export default accountSlice.reducer;
