import React from "react";
import Navbar from "../components/Navbar";
import NewsStories from "../components/news/NewsStories";
import NewsBlogGrid from "../components/news/NewsBlogGrid";
import NewsLatestWork from "../components/news/NewsLatestWork";
import { Footer } from "../components/Footer";

function News() {
  return (
    <>
      <Navbar />
      <NewsStories />
      <NewsBlogGrid />
      <NewsLatestWork />
      <Footer />
    </>
  );
}

export default News;