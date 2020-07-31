import {combineReducers, createStore} from "redux";
import modelReducer from "./modelReducer";
import stateReducer from "./stateReducer";

export default createStore(combineReducers(
    {
        modelData: modelReducer,
        stateData: stateReducer
    }
));

export { saveProduct, saveSuppliers, deleteProduct, deleteSupplier } from "./modelActionCreators"

