import './App.css';

import React from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
