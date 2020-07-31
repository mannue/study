import {DELETE, STORE, UPDATE} from "./modelActionTypes";
import {initialData} from "./initialDate";

export default function (storeData, action) {
    switch (action.type) {
        case STORE:
            return {
                ...storeData,
                [action.dataType]: storeData[action.dataType].concat([action.payload])
            }
        case UPDATE:
            return {
                ...storeData,
                [action.dataType]: storeData[action.dataType].map(p=> p.id === action.payload.id ? action.payload: p)
            }
        case DELETE:
            return {
                ...storeData,
                [action.dataType]: storeData[action.dataType].filter(p=> p.id !== action.payload.id)
            }
        default:
            return storeData || initialData.modelData;
    }
}
