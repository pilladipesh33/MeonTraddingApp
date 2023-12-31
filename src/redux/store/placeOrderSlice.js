import axios from "axios";
import { STATUSES } from "./apiStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const placeOrderItem = createAsyncThunk(
  "placeOrder/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    console.log(data);
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const response = await axios.post(
        "https://itrade.investmentwallet.in:10121/enterprise/orders",
        data,
        {
          headers: {
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

const placeOrderSlice = createSlice({
  name: "placeOrder",
  initialState: {
    orderData: {},
    orderDataStatus: "idle",
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
      .addCase(placeOrderItem.pending, (state, action) => {
        state.orderDataStatus = STATUSES.LOADING;
      })
      .addCase(placeOrderItem.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.orderDataStatus = STATUSES.IDLE;
      })
      .addCase(placeOrderItem.rejected, (state, action) => {
        state.orderDataStatus = STATUSES.ERROR;
      });
  },
});

export default placeOrderSlice.reducer;
export const { updateCreditStatus, setShowAlert } = placeOrderSlice.actions;
