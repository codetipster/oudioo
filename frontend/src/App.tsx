import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import AuthContext from './context/AuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login'; // Assuming you have a Login page component
import PodcastList from './pages/Podcasts/PodcastList';
import Register from './pages/Auth/Register'; // Assuming you have a Register page component
import SuccessPage from './pages/Auth/SuccessPage';
import CreatePodcast from './pages/Podcasts/createPodcast';
import './styles/App.scss'


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
            {/* These links should be in a Navbar component */}
            <nav>
              <Link className="link" to="/">Home</Link>
              {authToken ? (
                <>
                  <Link className="link" to="/logout">Logout</Link>
                  <Link className="link" to="/create-podcast">Create Podcast</Link>
                </>
              ) : (
                <>
                  <Link className="link" to="/login">Login</Link>
                  <Link className="link" to="/register">Register</Link>
                </>
              )}
            </nav>
            <Routes>
            <Route path="/success" element={<SuccessPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/podcastList" element={<PodcastList />} />
              <Route path="//create-podcast" element={<CreatePodcast />} />
            </Routes>
          </header>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
