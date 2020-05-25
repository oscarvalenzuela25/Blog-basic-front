import React from "react";

import MainBanner from "../components/Web/MainBanner";
import HomeItems from "../components/Web/HomeItems";
import HowMyItemsWork from "../components/Web/HowMyItemsWork";
import ReviewsItems from "../components/Web/ReviewsItems";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Inicio | Oscar Valenzuela Dev</title>
        <meta
          name="description"
          content="Home | Web sobre programacion"
          data-react-helmet="true"
        />
      </Helmet>
      <MainBanner />
      <HomeItems />
      <HowMyItemsWork />
      <ReviewsItems />
    </>
  );
};

export default Home;
