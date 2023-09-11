import axios from "axios";
import { STATUSES } from "./apiStatus";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import AsyncStorage from '@react-native-async-storage/async-storage';

export const orderBookData = createAsyncThunk(
  "orderBook/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
        const userID = await AsyncStorage.getItem('USER_ID');
      const response = await axios.get(
        `https://itrade.investmentwallet.in:10121/enterprise/orders?clientID=${userID}&userID=${userID}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      dispatch(setShowAlertFororderBook(true));
      // console.log('response.data', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: (err) => err.message,
  }
);

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState: {
    orderData: {},
    orderDataStatus: "idle",
    error: null,
    showAlertFororderBook: false,
  },
  reducers: {
    updateorderBookStatus: (state, action) => {
      state.creditStatus = action.payload;
    },
    setShowAlertFororderBook: (state, action) => {
      state.showAlertFororderBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBookData.pending, (state, action) => {
        state.orderDataStatus = STATUSES.LOADING;
      })
      .addCase(orderBookData.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.orderDataStatus = STATUSES.IDLE;
      })
      .addCase(orderBookData.rejected, (state, action) => {
        state.orderDataStatus = STATUSES.ERROR;
      });
  },
});

export default orderBookSlice.reducer;
export const { updateorderBookStatus, setShowAlertFororderBook } =
  orderBookSlice.actions;
