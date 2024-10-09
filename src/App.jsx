import React from 'react'
import Todo from './components/Todo'
import Login from './components/Login'
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo2 from './components/Todo2';
function App() {
  

  return (
    <>
     {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter> */}
      <Todo2 />
    </>
  )
}

export default App

