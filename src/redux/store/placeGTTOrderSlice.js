import axios from "axios";
import { STATUSES } from "./apiStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const placeGTTOrderItem = createAsyncThunk(
  "placeGttOrder/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const response = await axios.post(
        `https://itrade.investmentwallet.in:10121/enterprise/orders/gttorder`,
        data,
        {
          headers: {
            "Content-Type": "Application.json",
            Authorization: ` ${token}`,
          },
        }
      );

      dispatch(setShowAlert(true));
      console.log('response.data', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: (err) => err.message,
  }
);

const placeGTTOrderSlice = createSlice({
  name: "placeGttOrder",
  initialState: {
    gttOrderData: {},
    gttOrderDataStatus: "idle",
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
      .addCase(placeGTTOrderItem.pending, (state, action) => {
        state.gttOrderDataStatus = STATUSES.LOADING;
      })
      .addCase(placeGTTOrderItem.fulfilled, (state, action) => {
        state.gttOrderData = action.payload;
        state.gttOrderDataStatus = STATUSES.IDLE;
      })
      .addCase(placeGTTOrderItem.rejected, (state, action) => {
        state.gttOrderDataStatus = STATUSES.ERROR;
      });
  },
});

export default placeGTTOrderSlice.reducer;
export const { updateCreditStatus, setShowAlert } = placeGTTOrderSlice.actions;
