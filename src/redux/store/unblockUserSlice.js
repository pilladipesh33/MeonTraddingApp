import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./apiStatus";

export const unblockUserItem = createAsyncThunk(
    'unblockUser/fetch',
    async(data, {rejectWithValue, serializeError, dispatch}) => {
        // console.log(data)
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            const response = await axios.post(
                "https://itrade.investmentwallet.in:10121/enterprise/auth/unblockuser",
                data,
                {
                    headers: {
                      "Content-type": "application/json",
                      Authorization: `${token}`,
                    },
                  }
            );
            dispatch(setShowAlert(true))
            console.log('unblock user', response.data)
           return response?.data
        } catch (error) {
            return rejectWithValue(serializeError(error))
        }
    },
    {
        serializeError: (err) => err.message,
    }
)

const unblockUserSlice = createSlice({
    name: 'unblockUser',
    initialState: {
        unblockUserDetails: {},
        unblockUserStatus: 'idle',
        error: null,
        showAlert: false
    },
    reducers: {
        setShowAlert: (state, action) => {
            state.showAlert = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(unblockUserItem.pending,(state, action) => {
            state.unblockUserStatus = STATUSES.LOADING
        })
        .addCase(unblockUserItem.fulfilled, (state, action) => {
            state.unblockUserStatus = STATUSES.IDLE,
            state.unblockUserDetails = action.payload
        })
        .addCase(unblockUserItem.rejected, (state, action) => {
            state.unblockUserStatus = STATUSES.ERROR
        })
    }
})

export default unblockUserSlice.reducer;
export const {setShowAlert} = unblockUserSlice.actions;