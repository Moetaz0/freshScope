import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../static/ArticlePage.css";

const ArticlePage = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the article based on the ID
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://freshscope-bend-1.onrender.com/api/articles/${id}`); // Replace with your API URL
        const data = await response.json();
        setArticle(data); // Set the fetched article data
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]); // Dependency array ensures it runs when 'id' changes

  if (!article) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <p className="article-category">{article.categorie}</p>
      <img src={article.imageUrl} alt={article.title} className="article-image" />
      <p className="article-content">{article.content}</p>
      <p className="article-author">By {article.nomauteur}</p>
      <a href="/" className="back-btn" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
        Back to Articles
      </a>
    </div>
  );
};

export default ArticlePage;
