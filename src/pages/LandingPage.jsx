import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import Testimonials from "../Components/Testimonials/Testimonials";
import Footer from "../Components/Footer/Footer";
import Features from "../Components/Features/Features";
import Sponsors from "../Components/Sponsors/Sponsors";
import CTA from "../Components/CTA/CTA";
import Message from "../Components/Message/Message";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <Message />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;
