import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {STATUSES} from './apiStatus';
const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

export const deleteSymbolItem = createAsyncThunk(
  'deleteSymbol/fetch',
  async (data, {rejectWithValue, serializeError, dispatch}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userID = await AsyncStorage.getItem('USER_ID');
      const response = await axios.delete(
        `https://itrade.investmentwallet.in:10121/enterprise/group/symbols?userID=${userID}&groupName=${data?.groupName}&exchangeInstrumentID=${data?.ExchangeInstrumentID}&exchangeSegment=${data?.ExchangeSegment}&symbolExpiry=9999-12-31`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      dispatch(setShowAlertFordeleteSymbol(true));
      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: err => err.message,
  },
);

const deleteSymbolFromGroupSlice = createSlice({
  name: 'deleteSymbol',
  initialState: {
    deletedSymbol: {},
    deletedSymbolStatus: 'idle',
    error: null,
    showAlertFordeleteSymbol: false,
  },
  reducers: {
    updatedeleteSymbolStatus: (state, action) => {
      state.creditStatus = action.payload;
    },
    setShowAlertFordeleteSymbol: (state, action) => {
      state.showAlertFordeleteSymbol = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deleteSymbolItem.pending, (state, action) => {
        state.deletedSymbolStatus = STATUSES.LOADING;
      })
      .addCase(deleteSymbolItem.fulfilled, (state, action) => {
        state.deletedSymbol = action.payload;
        state.deletedSymbolStatus = STATUSES.IDLE;
      })
      .addCase(deleteSymbolItem.rejected, (state, action) => {
        state.deletedSymbolStatus = STATUSES.ERROR;
      });
  },
});

export default deleteSymbolFromGroupSlice.reducer;
export const {updatedeleteSymbolStatus, setShowAlertFordeleteSymbol} =
  deleteSymbolFromGroupSlice.actions;
