import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import AuthContext from './context/AuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login'; // Assuming you have a Login page component
import PodcastList from './pages/Podcasts/PodcastList';


function App() {

  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <Router>
        <div className="App">
          <header className="App-header">
            <h2>Odioo</h2>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </nav>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/podcastList" element={<PodcastList />} />
            </Routes>
          </header>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
