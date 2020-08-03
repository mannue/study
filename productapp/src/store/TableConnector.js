import {PRODUCTS, SUPPLIERS} from "./dataTypes";
import {startEditingProduct, startEditingSupplier} from "./stateActions";
import {deleteProduct, deleteSupplier} from "./modelActionCreators";
import {connect} from "react-redux";

export const TableConnector = (dataType, presentationComponent) => {
    const mapSateToProps = (storeData, ownProps) => {
        if(!ownProps.needSuppliers) {
            return { products: storeData.modelData[PRODUCTS] };
        } else {
            return {
                suppliers: storeData.modelData[SUPPLIERS].map(supp => ({
                    ...supp,
                    products: supp.products.map(id => storeData.modelData[PRODUCTS].find(p => p.id === Number(id)) || id).map(val => val.name || val)
                }))
            }
        }
    }

    const mapDispatchToProps = (dispatch, ownProps) => {
        console.log(ownProps)
        if (!ownProps.needSuppliers) {
            return {
                editCallback: (...args) => dispatch(startEditingProduct(...args)),
                deleteCallback: (...args) => dispatch(deleteProduct(...args))
            }
        } else {
            return {
                editCallback: (...args) => dispatch(startEditingSupplier(...args)),
                deleteCallback: (...args) => dispatch(deleteSupplier(...args)),
            }
        }
    }

    return connect(mapSateToProps, mapDispatchToProps)(presentationComponent);
}


