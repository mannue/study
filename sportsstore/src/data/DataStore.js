import {applyMiddleware, createStore} from "redux";
import { ShopReducer } from "./ShopReducer";
import {CommonReducer} from "./CommonReducer";
import {CartReducer} from "./CartReducer";
import { asyncAction } from "./AsyncMiddleware";

export const SportsStoreDataStore = createStore(CommonReducer(ShopReducer, CartReducer), applyMiddleware(asyncAction));