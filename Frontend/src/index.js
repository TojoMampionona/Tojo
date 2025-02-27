/*** Importation des dependances***/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Footer from './components/Footer/footer';
/*** Importation des pages ***/
import Home from './pages/Home/home';
import MySkills from './pages/MySkills';
import ContactMe from './pages/ContactMe/contactMe';
import Error from './components/Error/error';

import JeuxAnimation from './pages/Jeux/jeux';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MySkills" element={<MySkills />} />
          <Route path="/contactMe" element={<ContactMe />} />
          <Route path="/Jeux" element={<JeuxAnimation />} />
          <Route path="*" element={<Error />} />
        </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
