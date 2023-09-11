import io from 'socket.io-client';
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const connectToSocket = () => async (dispatch, getState) => {
  const url = 'https://itrade.investmentwallet.in:10121';
  const token = await AsyncStorage.getItem("TOKEN");
  const userID = await AsyncStorage.getItem('USER_ID');
  const socket = io(url, {
    transports: ['websocket'],
    path: '/marketdata/socket.io',
    query: {
      userID: userID,
      token: token,
      publishFormat: 'JSON',
      broadcastMode: 'Full',
    },
  });

  socket.on('connect', data => {
    console.log('Connected to socket');
  });

  socket.on('joined', data => {
    dispatch(setJoined(true));
    console.log(data);
  });

  socket.on('1502-json-full', data => {
    //   console.log(data);
    let d = JSON.parse(data);
    dispatch(setSocketData(d));
  });

  socket.on('1502-json-partial', data => {
    console.log(data);
    // Dispatch an action or handle the received data
  });

  socket.on('trade', function (data) {
    console.log('data is ' + data);
  });

  socket.on('connect_error', error => {
    console.log('connect',error);
  });

  socket.on('position', data => {
    console.log('Received 1505 message:', data);
  });

  socket.on('message', data => {
    console.log('Received 1505 message:', data);
  });

  socket.on('order', function (order) {
    console.log('interactive socket connected successfully!', order);
  });

  socket.on('holding', function (order) {
    console.log('trade socket connected successfully!');
  });
};

const socketConnectionSlice = createSlice({
  name: 'socketConnection',
  initialState: {
    joined: false,
    socketData: '',
  },
  reducers: {
    setSocketData: (state, action) => {
      state.socketData = action.payload;
    },
    setJoined: (state, action) => {
      state.joined = action.payload;
    },
  },
});

export const {setSocketData, setJoined} = socketConnectionSlice.actions;
export default socketConnectionSlice.reducer;
