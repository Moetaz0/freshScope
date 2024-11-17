import React, { useState, useEffect } from "react";
import "../static/AboutUs.css";
import { Link } from "react-router-dom";
import axios from "axios";

const AboutUs = () => {
  const [politicsArticles, setPoliticsArticles] = useState([]);

  // Fetch articles with the "Politics" category and exclude "isLie" articles
  useEffect(() => {
    const fetchPoliticsArticles = async () => {
      try {
        const response = await axios.get("https://freshscope-bend-1.onrender.com/api/articles"); // Replace with your API URL
        const filteredArticles = response.data.filter(
          (article) => article.categorie === "Politics" && !article.isLie
        );
        setPoliticsArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching politics articles:", error);
      }
    };

    fetchPoliticsArticles();
  }, []);

  return (
    <div className="home-container">
      <div className="arts-culture-section">
        <h3>Politics</h3>
        <div className="arts-culture-articles">
          {politicsArticles.map((article) => (
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

export default AboutUs;
