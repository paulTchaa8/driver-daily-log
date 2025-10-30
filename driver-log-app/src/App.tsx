import { Container, Navbar } from 'react-bootstrap'
import Dashboard from './pages/Dashboard'
import logo from './logo.png'

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
        <Container className="d-flex align-items-center justify-content-start">
          {/* Logo à gauche */}
          <img 
            src={logo} 
            alt="Logo" 
            style={{ height: '40px', marginRight: '5px' }}
          />
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
