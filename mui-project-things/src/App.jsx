import './App.css';
import React from 'react';
import { Route, Routes} from "react-router-dom"
import {  Cards } from "./Pages/DisplayCards"
import { Table } from "./Pages/Display"
import { NavBar } from "./Pages/Navbar"
import { Home } from "./Pages/StartPage"
import Grid from '@mui/material/Grid2';
function App() {
  return (
  <Grid container>
  <NavBar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/plants" element={<Cards/>}/>
    <Route path="/table" element={<Table/>}/>
  </Routes>
  </Grid>
  );
}

export default App;
