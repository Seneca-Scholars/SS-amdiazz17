import './App.sass';
import React from 'react';
import { Route, Routes} from "react-router-dom"
import {  Cards } from "./Pages/DisplayCards"
import { Table } from "./Pages/Display"
import { NavBar } from "./Pages/Navbar"
import { Home } from "./Pages/StartPage"
import { CalenderPage } from "./Pages/Calender"
import Grid from '@mui/material/Grid2';
import { App2 } from "./Pages/dm.jsx";

function App() {
  return (
  <Grid>
  <NavBar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/plants" element={<Cards/>}/>
    <Route path="/table" element={<Table/>}/>
    <Route path="/calender" element={<CalenderPage/>}/>
    <Route path="/dm" element={<App2/>}/>
  </Routes>
  </Grid>
  );
}

export default App;
