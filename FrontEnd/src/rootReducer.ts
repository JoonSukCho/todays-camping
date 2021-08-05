import { combineReducers } from "@reduxjs/toolkit";
import users from "./Slices/users";

const reducer = combineReducers({
    users,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;