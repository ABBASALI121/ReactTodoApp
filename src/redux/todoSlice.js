import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { name, email } = action.payload;
      const todo = {
        id: uuidv4(),
        name,
        email,
      }
      state.todos.push(todo)
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    updateTodo: (state, action) => {
      const { id, name, email } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.name = name;
        existingTodo.email = email;
      }
    },
  }
})

export const { addTodo, removeTodo, setTodos, updateTodo } = todoSlice.actions

export default todoSlice.reducer