import { createStore } from "redux";
import modelReducer from "./modelReducer";

export default createStore(modelReducer);

export { saveProduct, saveSuppliers, deleteProduct, deleteSupplier } from "./modelActionCreators"

