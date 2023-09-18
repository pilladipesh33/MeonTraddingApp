import axios from "axios";
import { STATUSES } from "./apiStatus";
import { TOKEN } from "../../constants/apis/APIConstants";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import AsyncStorage from '@react-native-async-storage/async-storage';

export const cancelOrderItem = createAsyncThunk(
  "cancelOrder/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
        const userID = await AsyncStorage.getItem('USER_ID');
      const response = await axios.delete(
        `https://itrade.investmentwallet.in:10121/enterprise/orders?appOrderID=${data}&clientID=40151&userID=${userID}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      dispatch(setShowAlertForcancelOrder(true));
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

const cancelOrderSlice = createSlice({
  name: "cancelOrder",
  initialState: {
    cancelOrder: {},
    cancelOrderStatus: "idle",
    error: null,
    showAlertForcancelOrder: false,
  },
  reducers: {
    updatecancelOrderStatus: (state, action) => {
      state.creditStatus = action.payload;
    },
    setShowAlertForcancelOrder: (state, action) => {
      state.showAlertForcancelOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cancelOrderItem.pending, (state, action) => {
        state.cancelOrderStatus = STATUSES.LOADING;
      })
      .addCase(cancelOrderItem.fulfilled, (state, action) => {
        state.cancelOrder = action.payload;
        state.cancelOrderStatus = STATUSES.IDLE;
      })
      .addCase(cancelOrderItem.rejected, (state, action) => {
        state.cancelOrderStatus = STATUSES.ERROR;
      });
  },
});

export default cancelOrderSlice.reducer;
export const { updatecancelOrderStatus, setShowAlertForcancelOrder } =
  cancelOrderSlice.actions;
