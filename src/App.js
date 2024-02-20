import './App.css';

import React from "react";

import Eclipse from "./images/Eclipse-circle-1.webp";

import { Header } from './components/header';
import { Footer } from './components/footer';
import { Content } from './components/content';

function App() {
  return (
    <div className="App">
      <div className='banner-eclipse'>
                  <img
                    className="normal"
                    src={Eclipse}
                    width="840"
                    alt="Blockchainx"
                    />  
      </div>
      <div className='banner-eclipse-alt'>
                  <img
                    className="normal"
                    src={Eclipse}
                    width="840"
                    alt="Blockchainx"
                    />  
                    </div>
      <Header /> 
      <Content /> 

{/* <BrowserRouter>
  <Routes>
  <Route path='/' element={<Header />} />
  </Routes>
</BrowserRouter>  */}
      <Footer/>  
    </div>
  );
}

export default App;
