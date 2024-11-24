import React, { useState, useEffect } from "react";
import "../static/AboutUs.css";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingComponent from "./loading";

const AboutUs = () => {
  const [politicsArticles, setPoliticsArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch articles with the "Politics" category and exclude "isLie" articles
  useEffect(() => {
    const fetchPoliticsArticles = async () => {
      console.log("Fetching articles..."); // Debug log
      try {
        const response = await axios.get("https://freshscope-bend-1.onrender.com/api/articles");
        console.log("API response:", response.data); // Debug log
        const filteredArticles = response.data.filter(
          (article) => article.categorie === "Politics" && !article.isLie
        );
        setPoliticsArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching politics articles:", error);
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
        console.log("Loading set to false"); // Debug log
      }
    };

    fetchPoliticsArticles();
  }, []);

  // Show loading spinner if still loading
  if (loading) {
    console.log("Rendering LoadingComponent..."); // Debug log
    return <LoadingComponent />;
  }

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
              key={article._id} // Fixed key property
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
