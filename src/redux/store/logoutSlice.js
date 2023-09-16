import axios from "axios";
import { STATUSES } from "./apiStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const logoutUser = createAsyncThunk(
  "logout/fetch",
  async (_, { rejectWithValue, serializeError, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
      const response = await axios.delete(
        "https://developers.symphonyfintech.in/interactive/user/session",
        `${token}`
      );

      dispatch(setShowAlert(true));

      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: (err) => err.message,
  }
);

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    userData: {},
    userStatus: "idle",
    error: null,
    showAlert: false,
  },
  reducers: {
    updateCreditStatus: (state, action) => {
      state.creditStatus = action.payload;
    },
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state, action) => {
        state.userStatus = STATUSES.LOADING;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.userStatus = STATUSES.IDLE;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userStatus = STATUSES.ERROR;
      });
  },
});

export default logoutSlice.reducer;
export const { updateCreditStatus, setShowAlert } = logoutSlice.actions;
