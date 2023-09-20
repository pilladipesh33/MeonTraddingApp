import axios from "axios";
import { STATUSES } from "./apiStatus";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addStockToGroupItem = createAsyncThunk(
  "addStockToGroup/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    console.log(data)
    try {
        const token = await AsyncStorage.getItem('TOKEN');
      const response = await axios.post(
        `https://itrade.investmentwallet.in:10121/enterprise/group/symbols`, data,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `${token}`
          },
        }
      );

      dispatch(setShowAlertForAddGroup(true));
    //   console.log('response.data', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: (err) => err.message,
  }
);

const addStockToGroupSlice = createSlice({
  name: "addStockToGroup",
  initialState: {
    addedStock: {},
    addedStockStatus: "idle",
    error: null,
    showAlertForAddStock: false,
  },
  reducers: {
    setShowAlertForAddGroup: (state, action) => {
      state.showAlertForAddStock = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStockToGroupItem.pending, (state, action) => {
        state.addedStockStatus = STATUSES.LOADING;
      })
      .addCase(addStockToGroupItem.fulfilled, (state, action) => {
        state.addedStock = action.payload;
        state.addedStockStatus = STATUSES.IDLE;
      })
      .addCase(addStockToGroupItem.rejected, (state, action) => {
        state.addedStockStatus = STATUSES.ERROR;
      });
  },
});

export default addStockToGroupSlice.reducer;
export const { setShowAlertForAddGroup } =
  addStockToGroupSlice.actions;
