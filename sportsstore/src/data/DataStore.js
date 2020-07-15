import { createStore } from "redux";
import { ShopReducer } from "./ShopReducer";
import {CommonReducer} from "./CommonReducer";
import {CartReducer} from "./CartReducer";

export const SportsStoreDataStore = createStore(CommonReducer(ShopReducer, CartReducer));