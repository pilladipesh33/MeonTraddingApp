import axios from "axios";
import { STATUSES } from "./apiStatus";
import { TOKEN } from "../../constants/apis/APIConstants";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import AsyncStorage from '@react-native-async-storage/async-storage';

export const unsubscriptionInstrumentsItem = createAsyncThunk(
  "unsubscriptionInstruments/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('TOKEN')
      const response = await axios.put(
        "https://itrade.investmentwallet.in:10121/marketdata/instruments/subscription",
        data,
        {
          headers: {
            Authorization: token,
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

const unsubscriptionInstrumentsSlice = createSlice({
  name: "unsubscriptionInstruments",
  initialState: {
    unsubscribedData: {},
    unsubscribedDataStatus: "idle",
    error: null,
    showAlert: false,
  },
  reducers: {
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(unsubscriptionInstrumentsItem.pending, (state, action) => {
        state.unsubscribedDataStatus = STATUSES.LOADING;
      })
      .addCase(unsubscriptionInstrumentsItem.fulfilled, (state, action) => {
        state.unsubscribedData = action.payload;
        state.unsubscribedDataStatus = STATUSES.IDLE;
      })
      .addCase(unsubscriptionInstrumentsItem.rejected, (state, action) => {
        state.unsubscribedDataStatus = STATUSES.ERROR;
      });
  },
});

export default unsubscriptionInstrumentsSlice.reducer;
export const { setShowAlert } = unsubscriptionInstrumentsSlice.actions;
