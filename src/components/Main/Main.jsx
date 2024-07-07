import React, { useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const endOfResultsRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setInput(e.target.value);
  };

  useEffect(() => {
    if (endOfResultsRef.current) {
      endOfResultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultData, loading]);

  return (
    <div className="main">
      <div className="nav">
        <p>Geminix</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <motion.div
              className="greet"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                <span>Hello, Apolo.</span>
              </p>
              <p>How can I help you today?</p>
            </motion.div>
            <motion.div
              className="cards"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div className="card" whileHover={{ scale: 1.05 }}>
                <p>Give me a top 10 countries that I should visit</p>
                <img src={assets.compass_icon} alt="" />
              </motion.div>
              <motion.div className="card" whileHover={{ scale: 1.05 }}>
                <p>Give me funny names for a cat.</p>
                <img src={assets.bulb_icon} alt="" />
              </motion.div>
              <motion.div className="card" whileHover={{ scale: 1.05 }}>
                <p>Tell me a short story.</p>
                <img src={assets.message_icon} alt="" />
              </motion.div>
              <motion.div className="card" whileHover={{ scale: 1.05 }}>
                <p>Explain how to use React.</p>
                <img src={assets.code_icon} alt="" />
              </motion.div>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img className="gemini-icon" src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
            <div ref={endOfResultsRef}></div>
          </motion.div>
        )}
        <motion.div
          className="main-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="search-box">
            <textarea
              onChange={handleInput}
              value={input}
              placeholder="Enter a prompt here..."
              onKeyDown={handleKeyDown}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <AnimatePresence>
                {input && (
                  <motion.img
                    key="send_icon"
                    onClick={() => onSent()}
                    src={assets.send_icon}
                    alt=""
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="bottom-info">
            Geminix may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Geminix Apps
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Main;
