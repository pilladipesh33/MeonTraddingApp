import axios from "axios";
import { STATUSES } from "./apiStatus";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getGroupDetails = createAsyncThunk(
  "getGroupDetails/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
        const userID =await AsyncStorage.getItem('USER_ID');
      const response = await axios.get(
        `https://itrade.investmentwallet.in:10121/enterprise/group?userID=${userID}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: token
          },
        }
      );

      dispatch(setShowAlertForgetGroupDetails(true));
      // console.log('resposne.data', response?.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: (err) => err.message,
  }
);

const getGroupDetailsSlice = createSlice({
  name: "getGroupDetails",
  initialState: {
    groups: {},
    groupsStatus: "idle",
    error: null,
    showAlertForgetGroupDetails: false,
  },
  reducers: {
    updategetGroupDetailsStatus: (state, action) => {
      state.creditStatus = action.payload;
    },
    setShowAlertForgetGroupDetails: (state, action) => {
      state.showAlertForgetGroupDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroupDetails.pending, (state, action) => {
        state.groupsStatus = STATUSES.LOADING;
      })
      .addCase(getGroupDetails.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.groupsStatus = STATUSES.IDLE;
      })
      .addCase(getGroupDetails.rejected, (state, action) => {
        state.groupsStatus = STATUSES.ERROR;
      });
  },
});

export default getGroupDetailsSlice.reducer;
export const { updategetGroupDetailsStatus, setShowAlertForgetGroupDetails } =
  getGroupDetailsSlice.actions;
