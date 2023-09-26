import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {STATUSES} from './apiStatus';

export const getLedgerReport = createAsyncThunk(
  'getLedgerReport/fetch',
  async ({rejectWitValue, serializeError, dispatch}) => {
   console.log('test');
    try {
      const response = await axios.get(
        'https://trading.meon.co.in/auth/ledger?client_code=CD108',
      );
      dispatch(setShowAlert(true));
      console.log('response.data', response.data)
      return response.data;
    } catch (error) {
      return rejectWitValue(serializeError(error));
    }
  },
  {
    serializeError: err => err.message,
  },
);

const getLedgerReportSlice = createSlice({
  name: 'getLedgerReport',
  initialState: {
    ledgerReportData: {},
    ledgerReportStatus: 'idle',
    error: null,
    setShowAlert: false,
  },
  reducers: {
    setShowAlert: (state, action) => {
      state.setShowAlert = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getLedgerReport.pending, (state, action) => {
        state.ledgerReportStatus = STATUSES.LOADING;
      })
      .addCase(getLedgerReport.fulfilled, (state, action) => {
        state.ledgerReportData = action.payload;
        state.ledgerReportStatus = STATUSES.IDLE;
      })
      .addCase(getLedgerReport.rejected, (state, action) => {
        state.ledgerReportStatus = STATUSES.ERROR;
      });
  },
});

export default getLedgerReportSlice.reducer;
export const {setShowAlert} = getLedgerReportSlice.actions;
