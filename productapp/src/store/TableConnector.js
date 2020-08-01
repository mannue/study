import {PRODUCTS, SUPPLIERS} from "./dataTypes";
import {startEditingProduct, startEditingSupplier} from "./stateActions";
import {deleteProduct, deleteSupplier} from "./modelActionCreators";
import {connect} from "react-redux";

export const TableConnector = (dataType, presentationComponent) => {
    const mapSateToProps = (storeData) => ({
        products: storeData.modelData[PRODUCTS],
        suppliers: storeData.modelData[SUPPLIERS].map(supp => ({
            ...supp,
            products: supp.products.map(id => storeData.modelData[PRODUCTS].find(p => p.id === Number(id)) || id).map(val => val.name || val)
        }))
    })

    const mapDispatchToProps = {
        editCallback: dataType === PRODUCTS ? startEditingProduct : startEditingSupplier,
        deleteCallback: dataType === PRODUCTS ? deleteProduct : deleteSupplier
    }

    return connect(mapSateToProps, mapDispatchToProps)(presentationComponent);
}