import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "./store/loginSlice";
import validateOTPSlice from "./store/validateOTPSlice";
import userProfileSlice from "./store/userProfileSlice";
import positionSlice from "./store/positionSlice";
import orderBookSlice from "./store/orderBookSlice";
import cancelOrderSlice from "./store/cancelOrderSlice";
import addGroupSilce from "./store/addGroupSilce";
import deletGroupSlice from "./store/deletGroupSlice";
import subscriptionsInstrumentsSlice from "./store/subscriptionsInstrumentsSlice";
import getGroupSymbolSlice from "./store/getGroupSymbolSlice";
import getInstrumentsDetailByIdSlice from "./store/getInstrumentsDetailByIdSlice";
import unsubscriptionsInstrumentSlice from "./store/unsubscriptionsInstrumentSlice";
import socketConnectionSlice from "./store/socketConnectionSlice";
import searchStockDataSlice from "./store/searchStockDataSlice";
import getGroupDetailsSlice from "./store/getGroupDetailsSlice";
import placeOrderSlice from "./store/placeOrderSlice";
import getExchangeMessageSlice from "./store/getExchangeMessageSlice";
import getAlertListSlice from "./store/getAlertListSlice";
;

const store = configureStore({
    reducer: {
        login : loginSlice,
        validateOTP : validateOTPSlice,
        userProfile: userProfileSlice,
        positions: positionSlice,
        orderBook: orderBookSlice,
        cancelOrder: cancelOrderSlice,
        addGroup: addGroupSilce,
        deleteGroup: deletGroupSlice,
        subscriptionInstruments : subscriptionsInstrumentsSlice,
        getGroupSymbol: getGroupSymbolSlice,
        getInstrumentDetailsById: getInstrumentsDetailByIdSlice,
        socketConnection: socketConnectionSlice,
        unSubscribedInstruments: unsubscriptionsInstrumentSlice,
        searchStockData: searchStockDataSlice,
        getGroupDetails: getGroupDetailsSlice,
        placeOrder: placeOrderSlice,
        getExchangeMessage: getExchangeMessageSlice,
        getAlertList: getAlertListSlice,
    }
});
export default store;