import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {STATUSES} from './apiStatus';
const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

export const getExchangeMessageItem = createAsyncThunk(
  'getExchangeMessage/fetch',
  async (data, {rejectWithValue, serializeError, dispatch}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const response = await axios.get(
        `https://itrade.investmentwallet.in:10121/enterprise/messages/exchange?exchangeSegment=NSECM`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      dispatch(setShowAlertExchangeMessage(true));
      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: err => err.message,
  },
);

const getExchangeMessageSlice = createSlice({
  name: 'getExchangeMessage',
  initialState: {
    exchangeMessageData: {},
    exchangeMessageStatus: 'idle',
    error: null,
    showAlertExchangeMessage: false,
  },
  reducers: {
    setShowAlertExchangeMessage: (state, action) => {
      state.showAlertExchangeMessage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getExchangeMessageItem.pending, (state, action) => {
        state.exchangeMessageStatus = STATUSES.LOADING;
      })
      .addCase(getExchangeMessageItem.fulfilled, (state, action) => {
        (state.exchangeMessageData = action.payload),
          (state.exchangeMessageStatus = STATUSES.IDLE);
      })
      .addCase(getExchangeMessageItem.rejected, (state, action) => {
        state.exchangeMessageStatus = STATUSES.ERROR;
      });
  },
});

export default getExchangeMessageSlice.reducer;
export const {setShowAlertExchangeMessage} = getExchangeMessageSlice.actions;
