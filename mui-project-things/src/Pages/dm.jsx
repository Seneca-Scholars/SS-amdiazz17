import './Display.scss';
import React from 'react';
import { DarkModeProvider } from '../dmcontext';
import { Container } from "./Container";

export function App2(){
    return(
            <DarkModeProvider>
                <Container/>
            </DarkModeProvider>
    );
}
 export default App2