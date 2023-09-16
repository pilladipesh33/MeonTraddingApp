import axios from "axios";
import { STATUSES } from "./apiStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const holdingItem = createAsyncThunk(
  "holding/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      const userID = await AsyncStorage.getItem("USER_ID");

      const response = await axios.get(
          `https://itrade.investmentwallet.in:10121/enterprise/portfolio/holdings?userID=${userID}&clientID=${userID}`,
        {
          headers: {
            Authorization:`${token}`,
          },
        }
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

const holdingSlice = createSlice({
  name: "holding",
  initialState: {
    holdingData: {},
    holdingDataStatus: "idle",
    error: null,
    showAlert: false,
  },
  reducers: {
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(holdingItem.pending, (state, action) => {
        state.holdingDataStatus = STATUSES.LOADING;
      })
      .addCase(holdingItem.fulfilled, (state, action) => {
        state.holdingData = action.payload;
        state.holdingDataStatus = STATUSES.IDLE;
      })
      .addCase(holdingItem.rejected, (state, action) => {
        state.holdingDataStatus = STATUSES.ERROR;
      });
  },
});

export default holdingSlice.reducer;
export const { setShowAlert } = holdingSlice.actions;
