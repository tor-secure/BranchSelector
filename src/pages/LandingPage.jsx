import Hero from "../Components/Hero/Hero";
import Testimonials from "../Components/Testimonials/Testimonials";
import Features from "../Components/Features/Features";
import Sponsors from "../Components/Sponsors/Sponsors";
import CTA from "../Components/CTA/CTA";
import Message from "../Components/Message/Message";


const LandingPage = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <Message />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
};

export default LandingPage;
