import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"
import { applyMiddleware, createStore } from "redux";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;