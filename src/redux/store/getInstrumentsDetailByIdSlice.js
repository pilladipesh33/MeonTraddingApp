import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { STATUSES } from "./apiStatus";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getInstrumentsDetailsById = createAsyncThunk(
  "getInstrumentsDetailsById/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
      const response = await axios.post(
        `https://itrade.investmentwallet.in:10121/marketdata/search/instrumentsbyid`,
        data,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      );

      dispatch(setShowAlertForgetInstrumentsDetailsById(true));
      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: (err) => err.message,
  }
);

const getInstrumentsDetailsByIdSlice = createSlice({
  name: "getInstrumentsDetailsById",
  initialState: {
    instrumentsDetail: {},
    instrumentsDetailStatus: "idle",
    error: null,
    showAlertForgetInstrumentsDetailsById: false,
  },
  reducers: {
    updategetInstrumentsDetailsByIdStatus: (state, action) => {
      state.creditStatus = action.payload;
    },
    setShowAlertForgetInstrumentsDetailsById: (state, action) => {
      state.showAlertForgetInstrumentsDetailsById = action.payload;
    },
    updateInstrumentData: (state, action) => {
      state.instrumentsDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInstrumentsDetailsById.pending, (state, action) => {
        state.instrumentsDetailStatus = STATUSES.LOADING;
      })
      .addCase(getInstrumentsDetailsById.fulfilled, (state, action) => {
        state.instrumentsDetail = action.payload;
        state.instrumentsDetailStatus = STATUSES.IDLE;
      })
      .addCase(getInstrumentsDetailsById.rejected, (state, action) => {
        state.instrumentsDetailStatus = STATUSES.ERROR;
      });
  },
});

export default getInstrumentsDetailsByIdSlice.reducer;
export const {
  updategetInstrumentsDetailsByIdStatus,
  setShowAlertForgetInstrumentsDetailsById,
  updateInstrumentData,
} = getInstrumentsDetailsByIdSlice.actions;
