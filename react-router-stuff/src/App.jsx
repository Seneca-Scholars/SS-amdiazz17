import './App.css';
import React from 'react';
import { Route, Routes} from "react-router-dom"
import { Home } from "./Pages/StartPage"
import { Location } from "./Pages/GoogleMap"
import { Table } from "./Pages/Display"
import { NavBar } from "./Pages/Navbar"
import Grid from '@mui/material/Grid';
function App() {
  return (
  <Grid container>
  <NavBar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/map" element={<Location/>}/>
    <Route path="/table" element={<Table/>}/>
  </Routes>
  </Grid>
  );
}

export default App;
