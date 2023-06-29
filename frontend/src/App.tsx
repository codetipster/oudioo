import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import AuthContext from "./context/AuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import PodcastList from "./pages/Podcasts/PodcastList";
import Register from "./pages/Auth/Register";
import SuccessPage from "./pages/Auth/SuccessPage";
import PodcastDetail from "./pages/Podcasts/PodcastDetail";
import CreatePodcast from "./pages/Podcasts/createPodcast";
import NewEpisode from "./pages/Episodes/NewEpisode";
import Navbar from "./components/Navbar"; // Assuming you have a Navbar component
import "./styles/App.scss";

function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Home authToken={authToken} />} />
              <Route path="/" element={<Home authToken={authToken} />} />
              <Route path="/podcastList" element={<PodcastList />} />
              <Route path="/podcasts/:id" element={<PodcastDetail />} />
              <Route
                path="/podcasts/:id/episodes/new"
                element={<NewEpisode />}
              />
              <Route path="/create-podcast" element={<CreatePodcast />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
