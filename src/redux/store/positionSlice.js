import axios from "axios";
import { STATUSES } from "./apiStatus";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import AsyncStorage from '@react-native-async-storage/async-storage';

export const positionItem = createAsyncThunk(
  "position/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userID = await AsyncStorage.getItem('USER_ID');

      const response = await axios.get(
        `https://itrade.investmentwallet.in:10121/enterprise/portfolio/positions?dayOrNet=NetWise&clientID=${userID}&userID=${userID}`,
        {
          headers: {
            Authorization: `${token}`,
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

const positionSlice = createSlice({
  name: "position",
  initialState: {
    positionData: {},
    positionDataStatus: "idle",
    error: null,
    showAlert: false,
  },
  reducers: {
    updateCreditStatus: (state, action) => {
      state.creditStatus = action.payload;
    },
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(positionItem.pending, (state, action) => {
        state.positionDataStatus = STATUSES.LOADING;
      })
      .addCase(positionItem.fulfilled, (state, action) => {
        state.positionData = action.payload;
        state.positionDataStatus = STATUSES.IDLE;
      })
      .addCase(positionItem.rejected, (state, action) => {
        state.positionDataStatus = STATUSES.ERROR;
      });
  },
});

export default positionSlice.reducer;
export const { updateCreditStatus, setShowAlert } = positionSlice.actions;
