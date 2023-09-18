import axios from "axios";
import { STATUSES } from "./apiStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const handlePlaceOrder = async (
  productType,
  orderType,
  disclosureQuantity,
  orderQuantity,
  validity,
  navigation,
  orderSide,
  exchangeInstrumentID
) => {
  try {
    // console.log('exchangeInstrumentID', exchangeInstrumentID)
    const apiUrl = "https://itrade.investmentwallet.in:10121/enterprise/orders";
    const requestData = {
      clientID: '40151',
      exchangeSegment: 'NSECM',
      exchangeInstrumentID: 5097,
      productType: `${productType}`,
      orderType: `${orderType}`,
      orderSide: `${orderSide}`,
      timeInForce: disclosureQuantity,
      disclosedQuantity: validity,
      orderQuantity: orderQuantity,
      limitPrice: 2000,
      stopPrice: 0,
      userID: '40151',
    };
    const token = await AsyncStorage.getItem('TOKEN');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(requestData),
    };
    const response = await fetch(apiUrl, requestOptions);
    const data = await response?.json();
    // console.log('reqdata', data);
  
    if(data?.type == 'success'){
        AsyncStorage.setItem('ORDER_ID',JSON.stringify(data?.result?.AppOrderID))
        navigation.navigate('BottomTab')
    }
  } catch (error) {
    if(data?.type == 'error'){
    // console.log('Error: ', data?.result?.error);
    }
  }
};



export const placeOrderItem = createAsyncThunk(
  "placeOrder/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    // console.log(data);
    try {
      const token = AsyncStorage.getItem('TOKEN');
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
