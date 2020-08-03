import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import modelReducer from "./modelReducer";
import stateReducer from "./stateReducer";
import {customReducerEnhancer} from "./customReducerEnhancer";
import {multiActions} from "./multiActionMiddleware";
import {asyncEnhancer} from "./asyncEnhancer";

const enhancedReducer = customReducerEnhancer(
    combineReducers(
        {
            modelData: modelReducer,
            stateData: stateReducer
        }
    )
);

export default createStore(enhancedReducer, compose(applyMiddleware(multiActions), asyncEnhancer(2)));

export { saveProduct, saveSupplier, deleteProduct, deleteSupplier } from "./modelActionCreators"

