import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
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
import holdingSlice from "./store/holdingSlice";
import forgotPasswordSlice from "./store/forgotPasswordSlice";
import themeSlice from "./store/themeSlice";
import changePasswordSlice from "./store/changePasswordSlice";
import unblockUserSlice from "./store/unblockUserSlice";
import addStockToGroupSlice from "./store/addStockToGroupSlice";
import deleteSymbolFromGroupSlice from "./store/deleteSymbolFromGroupSlice";
import placeGTTOrderSlice from "./store/placeGTTOrderSlice";
import getLedgerReportSlice from "./store/getLedgerReportSlice";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {warnAfter: 150},
        serializableCheck: {warnAfter : 150}
    }),
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
        holding: holdingSlice,
        forgotPassword: forgotPasswordSlice,
        theme: themeSlice,
        changePassword: changePasswordSlice,
        unblockUser: unblockUserSlice,
        addStockToGroup: addStockToGroupSlice,
        deleteSymbolFromGroup: deleteSymbolFromGroupSlice,
        placeGttOrder: placeGTTOrderSlice,
        getLedgerReport: getLedgerReportSlice,
    }
});
export default store;