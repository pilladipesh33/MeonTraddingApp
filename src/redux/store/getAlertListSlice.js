import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {STATUSES} from './apiStatus';
const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

export const getAlertListItem = createAsyncThunk(
  'getAlertList/fetch',
  async (data, {rejectWithValue, serializeError, dispatch}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userID = await AsyncStorage.getItem('USER_ID');
      const response = await axios.get(
        `https://itrade.investmentwallet.in:10121/enterprise/alert?userID=${userID}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: token,
          },
        },
      );

      dispatch(setShowAlertListData(true));
    //   console.log('response.data', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: err => err.message,
  },
);

const getAlertListSlice = createSlice({
  name: 'getAlertList',
  initialState: {
    alertListData: {},
    alertListStatus: 'idle',
    error: null,
    showAlertListData: false,
  },
  reducers: {
    setShowAlertListData: (state, action) => {
      state.showAlertListData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAlertListItem.pending, (state, action) => {
        state.alertListStatus = STATUSES.LOADING;
      })
      .addCase(getAlertListItem.fulfilled, (state, action) => {
        state.alertListData = action.payload;
        state.alertListStatus = STATUSES.IDLE;
      })
      .addCase(getAlertListItem.rejected, (state, action) => {
        state.alertListStatus = STATUSES.ERROR;
      });
  },
});

export default getAlertListSlice.reducer;
export const {setShowAlertListData} = getAlertListSlice.actions;
