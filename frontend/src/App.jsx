import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import TaskInput from "./TaskInput";
import Register from "./Register";
function App() {
  return (
    // <>
    //   {/* <Login /> */}
    //   <TaskInput />
    //   {/* <Register /> */}
    // </>
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<TaskInput />} />
      </Routes>
    </>
  );
}

export default App;
