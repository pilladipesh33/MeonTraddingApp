import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./apiStatus";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const validateOTPUser = createAsyncThunk(
    'validateOTP/fetch',
    async(data, {rejectWithValue, serializeError, dispatch}) => {
        let payload = JSON.stringify(data);
        try{
            const response = await axios.post(
                'https://itrade.investmentwallet.in:10121/enterprise/auth/validatepin',
                data
            );
            dispatch(setShowAlert(true));
            if(response?.data?.type == 'success'){
                AsyncStorage.setItem('TOKEN', response?.data?.result?.token)
                console.log('response.data', response.data)
            }
            console.log('response.data', response.data)
            return response?.data;
        }catch(error) {
            return rejectWithValue(serializeError(error))
        }
    },
    {
        serializeError: (err) => err.message
    }
);

const validateOTPSlice = createSlice({
    name: "validateOTP",
    initialState: {
        validateOTPData: {},
        validateOTPStatus: 'idle',
        error: null,
        showAlert: false,
    },
    reducers: {
        setShowAlert: (action, state) => {
            state.showAlert = action.payload
        } 
    },
    extraReducers: (builder) => {
        builder
            .addCase(validateOTPUser.pending, (state,action) => {
                state.validateOTPStatus = STATUSES.LOADING
            })
            .addCase(validateOTPUser.fulfilled, (state, action) => {
                state.validateOTPData = action.payload,
                state.validateOTPStatus = STATUSES.IDLE
            })
            .addCase(validateOTPUser.rejected, (state, action) => {
                state.validateOTPStatus = STATUSES.ERROR
            })
    }
})

export default validateOTPSlice.reducer;
export const { setShowAlert } = validateOTPSlice.actions;