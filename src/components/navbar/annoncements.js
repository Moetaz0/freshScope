import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import '../../static/annoncements.css'; // Adjust the path if necessary

const API_BASE_URL = "https://freshscope-bend-1.onrender.com/api/articles/news"; // Replace with your backend API URL

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);

    // Fetch news from the backend
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                // Limit to the latest 3 announcements
                setAnnouncements(response.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="announcements">
            <div className="announcements-slider">
                {announcements.map((announcement, index) => (
                    <div className="announcement-item" key={index}>
                        {announcement.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcements;
