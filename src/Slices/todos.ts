import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
    id: string;
    done: boolean;
    text: string;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<Todo>) {
            state.push(action.payload);
        },

        toggleTodo(state, action: PayloadAction<Todo>) {
            const todo = state.find(todo => todo.id === action.payload.id);

            if (todo) {
                todo.done = !todo.done;
            }
        }
    }
})


export const { addTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;