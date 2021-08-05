import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string;
}

let tempId = 3;

export const users = createSlice({
    name: 'users',

    initialState: [
        { id: 1, name: 'User1' },
        { id: 2, name: 'User2' },
    ] as User[],

    reducers: {
        addUser(state, action: PayloadAction<User>) {
            action.payload.id = tempId++;
            
            return [...state, action.payload];
        },

        removeUser(state, action:PayloadAction<User>) {
            state.filter(user => user.id !== action.payload.id);
            return [...state];
        }
    }
});

export const { addUser, removeUser } = users.actions;
export default users.reducer;