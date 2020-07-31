import {PRODUCTS, SUPPLIERS} from "./dataTypes";

export const  STATE_START_EDITING   = "state_start_editing";
export const  STATE_END_EDITING     = "state_end_editing";
export const  STATE_START_CREATING  = "state_start_creating";

export const startEditingProduct = (product) => ({
    type: STATE_START_EDITING,
    dateType: PRODUCTS,
    payload: product
});

export const startEditingSupplier = (supplier) => ({
    type: STATE_START_EDITING,
    dateType: SUPPLIERS,
    payload: supplier
});

export const endEditingProduct = () => ({
    type: STATE_END_EDITING
})

export const startCreatingProduct = () => ({
    type: STATE_START_CREATING,
    dateType: PRODUCTS
})

export const startCreatingSupplier = () => ({
    type: STATE_START_CREATING,
    dateType: SUPPLIERS
})