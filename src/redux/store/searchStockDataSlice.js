import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {STATUSES} from './apiStatus';
import { TOKEN } from '../../constants/apis/APIConstants';

export const searchStockData = createAsyncThunk(
  'searchStockData/fetch',
  async (data, {rejectWithValue, serailizeError, dispatch}) => {
    // console.log('data', data);
    try {
        const token = await AsyncStorage.getItem('TOKEN')    
      const response = await axios.post(
        "https://itrade.investmentwallet.in:10121/marketdata/search/instrumentssearch",
        { source: "WEB", searchString: data },
        {
          headers: {
            Authorization:token
          },
        },
      );
      console.log("RESPONSE1" , response?.data)
   
      dispatch(setShowAlert(true));
      return response?.data;
    } catch (error) {
      return rejectWithValue(serailizeError(error));
    }
  },
  {
    serializeError: err => err.message,
  },
);

const searchStockDataSlice = createSlice({
  name: 'searchStockData',
  initialState: {
    stockData: {},
    stockStatus: 'idle',
    error: null,
    showAlert: false,
  },
  reducers: {
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchStockData.pending, (state, action) => {
        state.stockStatus = STATUSES.LOADING;
      })
      .addCase(searchStockData.fulfilled, (state, action) => {
        (state.stockData = action.payload), (state.stockStatus = STATUSES.IDLE);
      })
      .addCase(searchStockData.rejected, (state, action) => {
        state.stockStatus = STATUSES.ERROR;
      });
  },
});

export default searchStockDataSlice.reducer;
export const {setShowAlert} = searchStockDataSlice.actions;
