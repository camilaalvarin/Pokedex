import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Details from './components/Details/Details'
import PokemonCreate from './components/PokemonCreate/PokemonCreate'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
        <Route exact path= "/" element= {<Landing />} /> 
        <Route path= "/home" element= {<Home />}></Route>  
        <Route path= "/home/:id" element= {<Details />}></Route>  
        <Route path= "/pokemon" element= {<PokemonCreate />}></Route>  
        
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
