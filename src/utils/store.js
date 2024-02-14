import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({todo: todoSlice});

const persistConfig = {
    key: "root",
    storage,
    version: 1
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

const persistor = persistStore(store);
export {store, persistor};