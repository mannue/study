import {connect} from "react-redux";
import {endEditing} from "./stateActions"
import {saveProduct, saveSupplier} from "./modelActionCreators";
import {PRODUCTS, SUPPLIERS} from "./dataTypes";
import {saveAndEndEditing} from "./multiActionCreators";

export const EditorConnector = (dataType, presentationComponent) => {
    const mapStateToProps = (storeData) => ({
        editing: storeData.stateData.editing && storeData.stateData.selectedType === dataType,
        product: (storeData.modelData[PRODUCTS].find(p => p.id === storeData.stateData.selectedId)) || {},
        supplier: (storeData.modelData[SUPPLIERS].find(s => s.id === storeData.stateData.selectedId)) || {}
    })

    const mapDispatchToProps = {
        cancelCallback: endEditing,
        saveCallback: (data) => saveAndEndEditing(data, dataType) //{
             //dispatch((dataType === PRODUCTS ? saveProduct : saveSuppliers)(data));
             //dispatch(endEditing())
    }

    const mergeProps = (dataProps, functionProps, ownProps) => ({
        ...dataProps, ...functionProps, ...ownProps
    })

    return connect(mapStateToProps,mapDispatchToProps,mergeProps)(presentationComponent)
}
