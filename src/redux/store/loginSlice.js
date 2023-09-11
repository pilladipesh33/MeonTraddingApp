import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { STATUSES } from './apiStatus';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = createAsyncThunk(
    'login/fetch',
    async (data, {rejectWithValue, serializeError, dispatch}) => {
        let payload = JSON.stringify(data);
        console.log(data);
        try{
            const response = await axios.post(
                "https://itrade.investmentwallet.in:10121/enterprise/auth/validateuser",
                data
            );
            dispatch(setShowAlert(true))
            if(response?.data?.type == 'success'){
                AsyncStorage.setItem('USER_ID', response?.data?.result?.userID)
            }
            return response?.data
        }catch(error){
            return rejectWithValue(serializeError(error));
        }
    },
    {
        serializeError: (err) => err.message,
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userData: {},
        userStatus: "idle",
        error: null,
        showAlert: false
    },
    reducers: {
        setShowAlert: (state, action) => {
            state.showAlert = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state, action) =>{
            state.userStatus = STATUSES.LOADING
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.userData = action.payload;
            state.userStatus = STATUSES.IDLE
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.userStatus = STATUSES.ERROR
        })
    }
})

export default loginSlice.reducer;
export const {setShowAlert} = loginSlice.actions;