import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// ! Import Components
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';

//! Import Modules
import WebFont from 'webfontloader';


function App() {

  useEffect(()=>{
    WebFont.load({
      google:{
        families:['Roboto']
      }
    })
  },[])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
