import React from "react";
import Navbar from "../components/Navbar";
import StudioHero from "../components/studio/StudioHero";
import StudioAbout from "../components/studio/StudioAbout";
import StudioValues from "../components/studio/StudioValues";
import StudioManifesto from "../components/studio/StudioManifesto";
import StudioImage from "../components/studio/StudioImage";
import StudioTeam from "../components/studio/StudioTeam";
import { Footer } from "../components/Footer";

function Studio() {
  return (
    <>
      <Navbar />
      <StudioHero />
      <StudioAbout />
      <StudioValues />
      <StudioManifesto />
      <StudioImage />
      <StudioTeam />
      <Footer />
    </>
  );
}

export default Studio;