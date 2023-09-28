/*** Importation des dependances***/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Error from './components/Error';


/*** Importation des pages ***/
import Home from './pages/Home/index';
import AboutMe from './pages/AboutMe';
import MySkills from './pages/MySkills';
import HiringMe from './pages/HiringMe';
import Applications from './pages/Applications/index'

/*** Importation des applications ***/
import Meteo from './pages/Applications/Meteo'
import TauxDeChange  from './pages/Applications/TauxDeChange';
import Recettes from './pages/Applications/Recettes';
import Baiboly from './pages/Applications/Baiboly'
import TestametaTaloha from './pages/Applications/Baiboly/TestametaTaloha';
import TestametaVaovao from './pages/Applications/Baiboly/TestametaVaovao';

/*** Importation des composants ***/
import Header from './components/Header';
import Footer from './components/Footer';


import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/MySkills" element={<MySkills />} />
          <Route path="/HiringMe" element={<HiringMe />} />
          <Route path="/Applications" element={<Applications />} />
          <Route path="/Applications/Meteo" element={<Meteo />} />
          <Route path="/Applications/TauxDeChange" element={<TauxDeChange />} />
          <Route path="/Applications/Recettes" element={<Recettes />} />
          <Route path="/Applications/Baiboly" element={<Baiboly />} />
          <Route path="/Applications/Baiboly/TestametaVaovao" element={<TestametaVaovao />} />
          <Route path={`/Applications/Baiboly/TestametaVaovao/:fileName`} element={<TestametaVaovao />} />
          <Route path="/Applications/Baiboly/TestametaTaloha" element={<TestametaTaloha />} />
          <Route path={`/Applications/Baiboly/TestametaTaloha/:fileName`} element={<TestametaTaloha />} />
          <Route path="*" element={<Error />} />
        </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
