import Hero from "../Components/Hero/Hero";
import Testimonials from "../Components/Testimonials/Testimonials";
import Features from "../Components/Features/Features";
import Sponsors from "../Components/Sponsors/Sponsors";
import CTA from "../Components/CTA/CTA";
import Message from "../Components/Message/Message";
import CasseroleSpinner from "../Components/CasseroleSpinner";


const LandingPage = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <Message />
      <Features />
      <Testimonials />
      <CasseroleSpinner/>
      <CTA />

    </>
  );
};

export default LandingPage;
