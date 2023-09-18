import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./apiStatus";

export const changePasswordItem = createAsyncThunk(
    'changePassword/fetch',
    async(data, {rejectWithValue, serializeError, dispatch}) => {
        // console.log(data)
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            const response = await axios.post(
                "https://itrade.investmentwallet.in:10121/enterprise/auth/changepassword",
                data,
                {
                    headers: {
                      "Content-type": "application/json",
                      Authorization: `${token}`,
                    },
                  }
            );
            dispatch(setShowAlert(true))
            // console.log('response.data', response.data)
           return response?.data
        } catch (error) {
            return rejectWithValue(serializeError(error))
        }
    },
    {
        serializeError: (err) => err.message,
    }
)

const changePasswordSlice = createSlice({
    name: 'changePassword',
    initialState: {
        changePasswordDetails: {},
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
        .addCase(changePasswordItem.pending,(state, action) => {
            state.userStatus = STATUSES.LOADING
        })
        .addCase(changePasswordItem.fulfilled, (state, action) => {
            state.userStatus = STATUSES.IDLE,
            state.changePasswordDetails = action.payload
        })
        .addCase(changePasswordItem.rejected, (state, action) => {
            state.userStatus = STATUSES.ERROR
        })
    }
})

export default changePasswordSlice.reducer;
export const {setShowAlert} = changePasswordSlice.actions;