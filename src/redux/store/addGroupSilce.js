import axios from "axios";
import { STATUSES } from "./apiStatus";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addGroup = createAsyncThunk(
  "addGroup/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
      const response = await axios.post(
        `https://itrade.investmentwallet.in:10121/enterprise/group`, data,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: token
          },
        }
      );

      dispatch(setShowAlertForAddGroup(true));

      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: (err) => err.message,
  }
);

const addGroupSlice = createSlice({
  name: "addGroup",
  initialState: {
    addedGroup: {},
    addedGroupStatus: "idle",
    error: null,
    showAlertForAddGroup: false,
  },
  reducers: {
    setShowAlertForAddGroup: (state, action) => {
      state.showAlertForAddGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGroup.pending, (state, action) => {
        state.addedGroupStatus = STATUSES.LOADING;
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.addedGroup = action.payload;
        state.addedGroupStatus = STATUSES.IDLE;
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.addedGroupStatus = STATUSES.ERROR;
      });
  },
});

export default addGroupSlice.reducer;
export const { updateAddGroupStatus, setShowAlertForAddGroup } =
  addGroupSlice.actions;
