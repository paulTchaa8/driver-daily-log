import React from 'react';
import { Container, Navbar } from 'react-bootstrap'
import Dashboard from './pages/Dashboard'
import EldLogSheet from './components/EldLogSheet';
import logo from './logo.svg';
// @ts-ignore
import './App.css';

function App() {
  return (
    <>
      <Navbar 
        bg="dark"
        variant="dark"
        fixed="top"
        className="shadow-sm"
        style={{ zIndex: 1030 }}
      >
        <Container>
          <Navbar.Brand>Driver Daily Log</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="app-content">
        <Container>
          <Dashboard />
        </Container>
      </div>
    </>
  );
}

export default App;
