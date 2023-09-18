import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { STATUSES } from "./apiStatus";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getGroupSymbols = createAsyncThunk(
  "getGroupSymbols/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    // console.log(data);
    try {
        const token = await AsyncStorage.getItem('TOKEN');
        const userID = await AsyncStorage.getItem('USER_ID');
      const response = await axios.get(
        `https://itrade.investmentwallet.in:10121/enterprise/group/symbols?userID=${userID}&groupName=${data}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      );

      dispatch(setShowAlertForgetGroupSymbols(true));
      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: (err) => err.message,
  }
);

const getGroupSymbolsSlice = createSlice({
  name: "getGroupSymbols",
  initialState: {
    groupSymbol: 'data',
    groupSymbolStatus: "idle",
    error: null,
    showAlertForgetGroupSymbols: false,
  },
  reducers: {
    updategetGroupSymbolsStatus: (state, action) => {
      state.creditStatus = action.payload;
    },
    setShowAlertForgetGroupSymbols: (state, action) => {
      state.showAlertForgetGroupSymbols = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroupSymbols.pending, (state, action) => {
        state.groupSymbolStatus = STATUSES.LOADING;
      })
      .addCase(getGroupSymbols.fulfilled, (state, action) => {
        state.groupSymbol = action.payload;
        state.groupSymbolStatus = STATUSES.IDLE;
      })
      .addCase(getGroupSymbols.rejected, (state, action) => {
        state.groupSymbolStatus = STATUSES.ERROR;
      });
  },
});

export default getGroupSymbolsSlice.reducer;
export const { updategetGroupSymbolsStatus, setShowAlertForgetGroupSymbols } =
  getGroupSymbolsSlice.actions;
