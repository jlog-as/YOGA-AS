import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Yoga from './pages/Yoga/Yoga';
import About from './pages/About/About';
import Tutorials from './pages/Tutorials/Tutorials';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/start' element={<Yoga />} />
        <Route path='/about' element={<About />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
}
