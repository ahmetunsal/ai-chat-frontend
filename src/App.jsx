import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import PrivateRoute from './pages/PrivateRoute'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat">
            <Route index element={<ChatPage />} />
            <Route path=":id" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  )
}

export default App
