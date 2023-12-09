import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice';
import ploReducer from '../redux/ploSlice';
import dashboardReducer from '../redux/dashboardSlice';
import customerReducer from '../redux/customerSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dashboardSlice from "./dashboardSlice";
import browseSlice from "./browseSlice";
import withdrawalSlice from "./withdrawalSlice";
import notificationSlice from "./notificationSlice";


const persisConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    plo: ploReducer,
    dashboard: dashboardReducer,
    customer: customerReducer,
    browse: browseSlice,
    withdrawal: withdrawalSlice,
    notification: notificationSlice,
});
const persistedReducer = persistReducer(persisConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store);