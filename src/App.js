import './App.css';
import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaComment } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Components/home';
import Profile from './Components/profile';
import ChatWindow from './Components/ChatWindow';
import OnBoardingUI from './Components/OnBoardingUI';


function App() {
  const [activeItem, setActiveItem] = useState("home");
  const menuItems = [
    { name: "home", icon: <FaHome />, label: "Home",path:"/"  },
    { name: "profile", icon: <FaUser />, label: "Profile", path:"/profile" },
    { name: "settings", icon: <FaCog />, label: "Settings",path:"/settings" },
    { name: "chat", icon: <FaComment />, label: "Chat", path:"/chat" },
    { name: "onboarding", icon: <FaComment />, label: "OnBoarding", path:"/onboarding" },
  ];

  return (
    <div className="App">
      <header>
        <div style={{
          width: "100vw", height: "8vh", backgroundColor:"#d71e28",
          borderBottom: "3px solid yellow", textAlign: "left", padding: "4px"
        }}>
          <span style={{ color: "white", fontSize: "30px" }}>
            WELLS FARGO - SmartOnboard
          </span>
        </div>
      </header>
      <div className="content">
        <Router>
          <nav className="fancy-menu">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className={activeItem === item.name ? "active" : ""}
                  onClick={() => setActiveItem(item.name)}
                >
                  {item.icon}
                  <Link to={item.path} style={{color:"white"}}>{item.label}</Link>
                </li>
              ))} 
            </ul>
          </nav>
          <div className="content" style={{minHeight:"72.7vh"}}>
            <Routes>
              <Route path="/" Component={Home}/>
              <Route path="/profile" Component={Profile}/>
              <Route path="/settings" Component={Profile}/>
              <Route path="/chat" Component={ChatWindow}/>
              <Route path="/onboarding" Component={OnBoardingUI}/>

            </Routes>
          </div>
        </Router>
      </div>
      <footer className='footer'>
        &copy; 2025 Wells Fargo. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

