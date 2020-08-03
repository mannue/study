import {applyMiddleware, combineReducers, createStore} from "redux";
import modelReducer from "./modelReducer";
import stateReducer from "./stateReducer";
import {customReducerEnhancer} from "./customReducerEnhancer";
import {multiActions} from "./multiActionMiddleware";

const enhancedReducer = customReducerEnhancer(
    combineReducers(
        {
            modelData: modelReducer,
            stateData: stateReducer
        }
    )
);

export default createStore(enhancedReducer, applyMiddleware(multiActions));

export { saveProduct, saveSuppliers, deleteProduct, deleteSupplier } from "./modelActionCreators"

