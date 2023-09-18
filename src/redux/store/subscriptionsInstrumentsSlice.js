import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {TOKEN} from '../../constants/apis/APIConstants';
import {STATUSES} from './apiStatus';

export const subscriptionInstrumentsItem = createAsyncThunk(
  'subscriptionInstrument/fetch',
  async (data, {rejectWithValue, serializeError, dispatch}) => {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
      // console.log('data', data)
      const response = await axios.post(
        'https://itrade.investmentwallet.in:10121/marketdata/instruments/subscription',
        data,
        {
          headers: {
            Authorization: token
          },
        },
      );
      dispatch(setShowAlert(true));

      return response?.data;
      // console.log('RESPONSE2', response?.data)
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: err => err.message,
  },
);

const subscriptionInstrumentsSlice = createSlice({
  name: 'subscriptionInstrument',
  initialState: {
    subscribedData: {},
    subscribedDataStatus: 'idle',
    error: null,
    showAlert: false,
  },
  reducers: {
    setShowAlert: (action, state) => {
      state.showAlert = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(subscriptionInstrumentsItem.pending, (state, action) => {
        state.subscribedDataStatus = STATUSES.LOADING;
      })
      .addCase(subscriptionInstrumentsItem.fulfilled, (state, action) => {
        (state.subscribedDataStatus = STATUSES.IDLE),
          (state.subscribedData = action.payload);
      })
      .addCase(subscriptionInstrumentsItem.rejected, (state, payload) => {
        state.subscribedDataStatus = STATUSES.ERROR;
      });
  },
});

export default subscriptionInstrumentsSlice.reducer;
export const {setShowAlert} = subscriptionInstrumentsSlice.actions;
