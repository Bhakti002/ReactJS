import React from "react";
import Homepage from "./Homepage";
import "./Homepage.css";
import "./App.css";
import About from "./About";
import Footer from "./footer";  
import Faq from "./Faq";

function App() {
  return (
    <>
      <Homepage/>
      <About/>
      <Faq/>
      <Footer/>
    </>
  );
}

export default App;