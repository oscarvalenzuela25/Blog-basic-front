import React from "react";
import { ReactComponent as YoutubeIcon } from "../../../assets/RedesSociales/youtube.svg";
import { ReactComponent as TwitterIcon } from "../../../assets/RedesSociales/twitter.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/RedesSociales/facebook.svg";
import { ReactComponent as LinkedinIcon } from "../../../assets/RedesSociales/linkedin.svg";

import "./SocialLinks.scss";

const SocialLinks = () => {
  return (
    <div className="social-links">
      <a
        href="https://www.youtube.com"
        target="_blank"
        className="youtube"
        rel="noopener noreferrer"
      >
        <YoutubeIcon />
      </a>
      <a
        href="https://www.twitter.com"
        target="_blank"
        className="twitter"
        rel="noopener noreferrer"
      >
        <TwitterIcon />
      </a>
      <a
        href="https://www.facebook.com"
        target="_blank"
        className="facebook"
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </a>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        className="linkedin"
        rel="noopener noreferrer"
      >
        <LinkedinIcon />
      </a>
    </div>
  );
};

export default SocialLinks;
