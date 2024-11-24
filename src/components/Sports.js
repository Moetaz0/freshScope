import React, { useState, useEffect } from "react";
import "../static/Sports.css";
import axios from "axios";
import LoadingComponent from "./loading";
// Import the Link component from react-router-dom to enable navigation

import { Link } from "react-router-dom";

const Sports = () => {
  const [sportsArticles, setSportsArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch articles with the "Sports" category
  useEffect(() => {
    const fetchSportsArticles = async () => {
      try {
        const response = await axios.get("https://freshscope-bend-1.onrender.com/api/articles"); // Replace with your API URL
        const filteredArticles = response.data.filter(
          (article) => article.categorie === "Sports" && !article.isLie// Adjust based on your API's data structure
        );
        setSportsArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching sports articles:", error);
      }finally {
        setLoading(false); // Stop loading once the fetch is complete
        console.log("Loading set to false"); // Debug log
      }
    };

    fetchSportsArticles();
  }, []);

  // Show loading spinner if still loading
  if (loading) {
    console.log("Rendering LoadingComponent..."); // Debug log
    return <LoadingComponent />;
  }


  return (
    <div className="home-container">
      {/* Sports Section */}
      <div className="arts-culture-section">
        <h3>Sports</h3>
        <div className="arts-culture-articles">
          {sportsArticles.map((article, index) => (
            
            <Link
            to={{
              pathname: `/article/${article._id}`,
              state: { article }, // Pass the article data as state
            }}
            key={article.id}
            className="arts-culture-article-link"
          >
            <div className="arts-culture-article">
              <img src={article.imageUrl} alt={article.title} />
              <div className="content">
                <span className="category">{article.categorie}</span>
                <h4>{article.title}</h4>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 FreshScope. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Sports;
