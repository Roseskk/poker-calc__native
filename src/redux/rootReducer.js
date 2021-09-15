import {combineReducers} from "redux";
import {roomsReducer} from "./roomsReducer";

export const rootReducer = combineReducers({
    rooms : roomsReducer
})