import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../static/Home.css";
import LoadingComponent from "./loading";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const [mainArticles, setMainArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://freshscope-bend-1.onrender.com/api/articles"); // Replace with your API URL
        const allArticles = response.data.filter((article) => !article.isLie); // Exclude articles with isLie = true

        setMainArticles(allArticles.filter((article) => article.inSlide === true));
        setPopularArticles(allArticles.filter((article) => article.isPopular === true));
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
      finally {
        setLoading(false); // Stop loading once the fetch is complete
        console.log("Loading set to false"); // Debug log
      }
    };

    fetchArticles();
  }, []);

  const handleDotClick = (index) => {
    setCurrentMainIndex(index);
  };
  // Show loading spinner if still loading
  if (loading) {
    console.log("Rendering LoadingComponent..."); // Debug log
    return <LoadingComponent />;
  }


  return (
    <div className="home-container">
      {/* Main article and small articles */}
      <div className="top-section">
        {mainArticles.length > 0 && (
          <div className="main-article">
            <Link to={`/article/${mainArticles[currentMainIndex]._id}`}>
              <img
                src={mainArticles[currentMainIndex].imageUrl}
                alt={mainArticles[currentMainIndex].title}
              />
            </Link>
            <div className="content">
              <span className="category">{mainArticles[currentMainIndex].category}</span>
              <h2>{mainArticles[currentMainIndex].title}</h2>
              <p>{mainArticles[currentMainIndex].nomauteur}</p>
            </div>
            <div className="navigation-dots">
              {mainArticles.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentMainIndex ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          </div>
        )}

        <div className="small-articles">
          {popularArticles.map((article, index) => (
            <div className="small-article" key={index}>
              <Link to={`/article/${article._id}`}>
                <img src={article.imageUrl} alt={article.title} />
                <div className="content">
                  <span className="category">{article.categorie}</span>
                  <h4>{article.title}</h4>
                  <p>{article.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Other categories */}
      {["Politics", "Sports", "Technology"].map((category) => (
        <div className="arts-culture-section" key={category}>
          <div className="category-header">
            <h3>{category}</h3>
            <Link to={`/${category}`} className="see-all">
              See All
              <span className="see-all-arrow">→</span>
            </Link>
          </div>
          <div className="arts-culture-articles">
            {articles
              .filter((article) => article.categorie === category)
              .slice(0, 6) // Limit to 6 articles
              .map((article, index) => (
                <Link to={`/article/${article._id}`} className="arts-culture-article" key={index}>
                  <img src={article.imageUrl} alt={article.title} />
                  <div className="content">
                    <span className="category">{article.categorie}</span>
                    <h4>{article.title}</h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}

      <footer className="footer">
        <p>© 2024 FreshScope. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
