import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

export const store = configureStore(rootReducer); // TODO clean this up and make sure everything still works as expected

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
