import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { STATUSES } from "./apiStatus";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const deleteGroupItem = createAsyncThunk(
  "deleteGroup/fetch",
  async (data, { rejectWithValue, serializeError, dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('TOKEN');
        const userID = await AsyncStorage.getItem('USER_ID');
      const response = await axios.delete(
        `https://itrade.investmentwallet.in:10121/enterprise/group?userID=${userID}&groupName=${data}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      dispatch(setShowAlertFordeleteGroup(true));

      return response.data;
    } catch (error) {
      return rejectWithValue(serializeError(error));
    }
  },
  {
    serializeError: (err) => err.message,
  }
);

const deleteGroupSlice = createSlice({
  name: "deleteGroup",
  initialState: {
    deletedGroup: {},
    deletedGroupStatus: "idle",
    error: null,
    showAlertFordeleteGroup: false,
  },
  reducers: {
    updatedeleteGroupStatus: (state, action) => {
      state.creditStatus = action.payload;
    },
    setShowAlertFordeleteGroup: (state, action) => {
      state.showAlertFordeleteGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteGroupItem.pending, (state, action) => {
        state.deletedGroupStatus = STATUSES.LOADING;
      })
      .addCase(deleteGroupItem.fulfilled, (state, action) => {
        state.deletedGroup = action.payload;
        state.deletedGroupStatus = STATUSES.IDLE;
      })
      .addCase(deleteGroupItem.rejected, (state, action) => {
        state.deletedGroupStatus = STATUSES.ERROR;
      });
  },
});

export default deleteGroupSlice.reducer;
export const { updatedeleteGroupStatus, setShowAlertFordeleteGroup } =
  deleteGroupSlice.actions;
