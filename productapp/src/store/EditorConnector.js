
import {connect} from "react-redux";
import {endEditing} from "./stateActions"
import {saveProduct, saveSuppliers} from "./modelActionCreators";
import {PRODUCTS, SUPPLIERS} from "./dataTypes";

export const EditorConnector = (dataType, presentationComponent) => {
    const mapStateToProps = (storeData) => ({
        editing: storeData.stateData.editing && storeData.stateData.selectedType === dataType,
        product: (storeData.modelData[PRODUCTS].find(p => p.id === storeData.stateData.selectedId)) || {},
        supplier: (storeData.modelData[SUPPLIERS].find(s => s.id === storeData.stateData.selectedId)) || {}
    })

    const mapDispatchToProps = {
        saveCallback: dataType === PRODUCTS ? saveProduct: saveSuppliers,
        cancelCallback: endEditing,
    }
    return connect(mapStateToProps,mapDispatchToProps)(presentationComponent)
}
