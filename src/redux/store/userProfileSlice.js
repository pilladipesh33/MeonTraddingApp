import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./apiStatus";
import { TOKEN } from "../../constants/apis/APIConstants";

export const userProfileData = createAsyncThunk(
    'userProfile/fetch',
    async({rejectWithValue, serializeError, dispatch}) => {
        try{
            const token = await AsyncStorage.getItem('TOKEN');
            //console.log('token', token)
            const response = await axios.get(
                `https://itrade.investmentwallet.in:10121/enterprise/user/profile?clientID=40151&userID=40151`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                }
            );
            dispatch(setShowAlertForUserProfile(true));
            //console.log('response.data1', response.data)
            return response?.data
        }catch(error){
            return rejectWithValue(serializeError(error))
        }
    },
    {
        serializeError: ((err) => err.message)
    }
);

const userProfileSlice = createSlice({
    name : 'userProfile',
    initialState : {
        userData: {},
        userDataStatus: 'idle',
        error: null,
        setShowAlertForUserProfile: false
    },
    reducers: {
        setShowAlertForUserProfile: (action, payload) => {
            state.showAlertForUserProfile = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(userProfileData.pending, (state, action) => {
          state.userDataStatus = STATUSES.LOADING;
        })
        .addCase(userProfileData.fulfilled, (state, action) => {
          state.userData = action.payload;
          state.userDataStatus = STATUSES.IDLE;
        })
        .addCase(userProfileData.rejected, (state, action) => {
          state.userDataStatus = STATUSES.ERROR;
        });
    }
})

export default userProfileSlice.reducer;
export const { setShowAlertForUserProfile } = userProfileSlice.actions