import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import Login from './components/auth/Login';
import Homepage from './components/pages/Homepage';
import Signup from './components/auth/Signup';
import ListManager from './components/dashboard/ListManager';
import Sidebar from './components/dashboard/Sidebar'; // Import your Sidebar component
import Header from './components/pages/Header';
import Profile from './components/pages/Profile';

function App() {
  const { isOpen, onToggle } = useDisclosure(); // Manage sidebar state
  return (
    <Router>
      <Header onToggleSidebar={onToggle} /> {/* Pass toggle function to Header */}
      <Sidebar isOpen={isOpen} onToggle={onToggle} // Pass isOpen state to Sidebar
      />
      <Routes>
      <Route path='/' Component={Homepage} />
      <Route path='/login' Component={Login} />
      <Route path='/signup' Component={Signup} />
      <Route path="/profile" Component={Profile} />
      <Route path='/listmanager' element={<ListManager isOpen={isOpen} />} />
      </Routes>
    </Router>
  );
}

export default App;
