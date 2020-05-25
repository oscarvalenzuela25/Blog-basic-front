import React from "react";
import { CodeSandboxOutlined } from "@ant-design/icons";

import "./Error_404.scss";
const Error_404 = () => {
  return (
    <div className="error_404">
      <CodeSandboxOutlined />
      <h1>404</h1>
      <h2>Page not found</h2>
    </div>
  );
};

export default Error_404;
