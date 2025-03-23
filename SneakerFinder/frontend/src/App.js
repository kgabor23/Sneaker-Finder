import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Finder from './components/Finder';
import Sneaker from './components/Sneaker';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/finder" element={<Finder />} />
            <Route path="/sneaker/:id" element={<Sneaker />} />
        </Routes>
    );
}

export default App;
