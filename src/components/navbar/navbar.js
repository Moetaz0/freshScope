import React from 'react';
import { FaRegUser, FaSearch, FaRegStar} from 'react-icons/fa'; // Importing icons from react-icons
import Logo from './logo';
import Announcements from './annoncements';
import '../../static/navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div >
                    < Logo/>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/">Home</Link></li>
                    
                    <li><Link to="/Politics">Politics</Link></li>
                    <li><Link to="/Sports">Sports</Link></li>
                    <li><Link to="/Technology">Technology</Link></li>
                </ul>
                <div className="navbar-right">
                    <div className="navbar-search">
                        <input type="text" placeholder="Search..." />
                        <FaSearch className="search-icon" />
                    </div>
                    
                    <div className="navbar-lang">
                        <select className="lang-select">
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="ar">العربية</option>
                            <option value="zh">中文</option>
                        </select>
                    </div>
                   
                </div>
            </nav>
            <div className="navbar-underline"></div>
            <Announcements />
            <div className="navbar-underline"></div>
        
        </>
    );
};

export default Navbar;