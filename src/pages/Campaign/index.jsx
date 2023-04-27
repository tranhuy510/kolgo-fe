import React, { useState } from "react";
import classes from "./Campaign.module.css";
import "./index.css";
import HomeChienDich from "./ChienDich/HomeChienDich";

const Campaign = (props) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={classes.campaign}>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          Chiến Dịch
        </button>
        <button
          className={`tab-button ${activeTab === 2 ? "active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          Combo
        </button>
      </div>
      {activeTab === 1 && (
        <div>
          <HomeChienDich />
        </div>
      )}
      {activeTab === 2 && <div>Content 2</div>}
    </div>
  );
};

export default Campaign;
