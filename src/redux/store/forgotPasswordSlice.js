import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./apiStatus";

export const forgotPasswordItem = createAsyncThunk(
    'forgotPassword/fetch',
    async(data, {rejectWithValue, serializeError, dispatch}) => {
        try {
            const response = await axios.post(
                "https://itrade.investmentwallet.in:10121/enterprise/auth/forgotpassword",
                data
            );
            dispatch(setShowAlert(true))
           return response?.data
        } catch (error) {
            return rejectWithValue(serializeError(error))
        }
    },
    {
        serializeError: (err) => err.message,
    }
)

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        forgotPasswordDetails: {},
        userStatus: 'idle',
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
        .addCase(forgotPasswordItem.pending,(state, action) => {
            state.userStatus = STATUSES.LOADING
        })
        .addCase(forgotPasswordItem.fulfilled, (state, action) => {
            state.userStatus = STATUSES.IDLE,
            state.forgotPasswordDetails = action.payload
        })
        .addCase(forgotPasswordItem.rejected, (state, action) => {
            state.userStatus = STATUSES.ERROR
        })
    }
})

export default forgotPasswordSlice.reducer;
export const {setShowAlert} = forgotPasswordSlice.actions;