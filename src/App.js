import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import EditComponent from './components/EditComponent';
import {BrowserRouter as Router, Routes, Route,Link,Outlet} from 'react-router-dom';
import Footer from './components/footer';
const id = 13;

class App extends Component {

  
  constructor(props) {
    super(props);
  
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      isSidebarOpen: false
    };

  }
  
  handleLoginSuccess = () => {
    this.setState({ isLoggedIn: true, isSidebarOpen: true }); // isSidebarOpen durumunu da güncelle
    localStorage.setItem('isLoggedIn', 'true');
  }

  handleRegisterSuccess = () => {
    this.setState({ isLoggedIn: true });
  }

  handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    this.setState({ isLoggedIn: false, isSidebarOpen: false });
  }

  render() {
    
    return (
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Login onLoginSuccess={this.handleLoginSuccess} />} />

        <Route path="/login" element={<Login onLoginSuccess={this.handleLoginSuccess} />} />
          <Route path="/Admin" element={<Sidebar />} />
          <Route path="/edit/:id" element={<EditComponent />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
        <Footer/>
      </Router>
      
    );
  }
}

export default App;
