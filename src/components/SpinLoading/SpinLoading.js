import React from "react";

import "./SpinLoading.scss";

const SpinLoading = () => {
  return (
    <div className="container-spin">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  );
};

export default SpinLoading;
