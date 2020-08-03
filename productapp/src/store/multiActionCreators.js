import {PRODUCTS} from "./dataTypes";
import {saveProduct, saveSuppliers} from "./modelActionCreators";
import {endEditing} from "./stateActions";

export const saveAndEndEditing = (data, dataType) => [ dataType === PRODUCTS ? saveProduct(data) : saveSuppliers(data), endEditing()]