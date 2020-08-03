import {PRODUCTS, SUPPLIERS} from "./dataTypes";
import {DELETE, STORE, UPDATE} from "./modelActionTypes";

let idCounter = 100;

export const saveProduct = (product) => {
    return createSaveEvent(PRODUCTS, product)
}

export const saveSupplier = (supplier) => {
    return createSaveEvent(SUPPLIERS, supplier)
}

const createSaveEvent = (dateType, payload) => {
    if (!payload.id) {
        return {
            type: STORE,
            dataType: dateType,
            payload: { ...payload, id: idCounter++ }
        }
    } else {
        return {
            type: UPDATE,
            dataType: dateType,
            payload: payload
        }
    }
}

export const deleteProduct = (product) => ({
    type: DELETE,
    dataType: PRODUCTS,
    payload: product.id
})

export const deleteSupplier = (supplier) => ({
    type: DELETE,
    dataType: SUPPLIERS,
    payload: supplier.id,
})
