import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import AboutUs from './components/About'; // Adjust the import path as necessary
import Home from './components/Home'; // Example Home component
import Sports from './components/Sports'; // Example Sports component
import Tech from './components/tech'; // Example Tech component
import Navbar from './components/navbar/navbar'; // Your navbar component
import ArticlePage from './components/ArticlePage'; // Example ArticlePage component
import { Analytics } from "@vercel/analytics/react"
const App = () => {
  return (
    
    <Router>
      <Navbar /> {/* Your navbar with links */}
      <Analytics/>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/Politics" element={<AboutUs />} /> {/* About Us page */}
        <Route path="/Sports" element={<Sports />} /> {/* About Us page */}
        <Route path="/Technology" element={<Tech />} /> {/* About Us page */}
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
};

export default App;
