import authReducers from "./auth.reducers";
import userReducers from "./user.reducer";
import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";
import pageReducer from "./page.reducer";
import orderReducer from "./order.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    category: categoryReducer,
    product: productReducer,
    page: pageReducer,
    order: orderReducer,
});

export default rootReducer;