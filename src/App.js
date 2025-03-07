import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react'
import Login from './Components/LoginPage';
import ToDoPage from './Components/TodoPage';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
                <Route element={<ProtectedRoute />}>
                <Route path="/todopage" element={<ToDoPage/>}/>
        </Route>     
      </Routes>
     </Router>
  )
}

export default App;
