import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [showContent, setShowContent] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      if (window.innerWidth > 600) {
        setExtended(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (!extended) {
      setExtended(true);
      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
      setTimeout(() => setExtended(false), 300);
    }
  };

  return (
    <>
      <img onClick={toggleSidebar} className={`menu ${extended ? "extended" : ""}`} alt="Menu"  src={assets.menu_icon}/>
      <AnimatePresence>
        {(extended || !isMobile) && (
          <motion.div
            className={`sidebar ${extended ? "extended" : ""}`}
            initial={{ x: isMobile ? "-100%" : 0 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? "-100%" : 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="top">
              <div onClick={() => newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {showContent && <p>New Chat</p>}
              </div>
              {showContent && (
                <div className="recent">
                  <p className="recent-title">Recent</p>
                  {prevPrompts.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => loadPrompt(item)}
                      className="recent-entry"
                    >
                      <img src={assets.message_icon} alt="" />
                      <p>{item.slice(0, 18)}...</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bottom">
              <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {showContent && <p>Help</p>}
              </div>
              <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {showContent && <p>Activity</p>}
              </div>
              <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {showContent && <p>Settings</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
