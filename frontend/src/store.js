import { combineReducers } from "redux";
import { getTableReducer } from "./reducers/table-reducer";
import { orderReducer } from "./reducers/order-reducer";
import { stockReducer } from "./reducers/stock-reducer";
import { userReducer } from "./reducers/user-reducer";
import { menuReducer } from "./reducers/menu-reducer";
import { categoryReducer } from "./reducers/category-reducer";
import { modalReducer } from "./reducers/modal-reducer";
import { insertOrderReducer } from "./reducers/insertOrder-reducer";
import { selectedItemsReducer } from "./reducers/selectedItems-reducer";
import { insertMenuReducer } from "./reducers/insertMenu-reducer";
import { addModalReducer } from "./reducers/addModal-reducer";

export const rootReducer = combineReducers({
    getTableReducer,
    orderReducer,
    stockReducer,
    userReducer,
    menuReducer,
    categoryReducer,
    modalReducer,
    insertOrderReducer,
    selectedItemsReducer,
    insertMenuReducer,
    addModalReducer,
    })