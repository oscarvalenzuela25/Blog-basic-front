import React from "react";
import LogoNuevo from "../../../../assets/img/logo-nuevo.png";
import SocialLink from "../../SocialLinks";

import "./MyInfo.scss";

const MyInfo = () => {
  return (
    <div className="my-info">
      <img src={LogoNuevo} alt="Oscar Valenzuela" />
      <h4>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt iste
        sequi, error, perferendis autem voluptates nam ex natus reprehenderit.
      </h4>
      <SocialLink />
    </div>
  );
};

export default MyInfo;
