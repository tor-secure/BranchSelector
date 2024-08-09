import React from 'react';
import { BiSolidBrain } from "react-icons/bi";
import { FaBookReader, FaLightbulb, FaRocket, FaTheaterMasks } from "react-icons/fa";
import { GiPaintBrush } from "react-icons/gi";
import { IoEar, IoRocket } from "react-icons/io5";
import { MdEngineering, MdOutlineEmojiEmotions, MdOutlineTimer, MdWork } from "react-icons/md";
import { PiBarbellFill, PiCertificateFill } from "react-icons/pi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { TbAbc } from "react-icons/tb";

const testMetaData = {
  engineering: {
    queryCode: "engineering",
    name: "Engineering Test",
    displayType: "slider",
    evaluationType: "weighted-aggregation",
    icon: MdEngineering,
    description:
      "Discover which branch of engineering aligns with your interests and strengths",
  },

  brain: {
    queryCode: "brain",
    name: "Brain Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: BiSolidBrain,
    description:
      "Explore your cognitive strengths and discover your dominant brain hemisphere",
  },

  interest: {
    queryCode: "interest",
    name: "Interest Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: GiPaintBrush,
    description:
      "Uncover your passions and interests to guide your career and personal pursuits",
  },

  iq: {
    queryCode: "iq",
    name: "IQ Test",
    displayType: "img-mcq",
    evaluationType: "single-option",
    icon: RiLightbulbFlashFill,
    description:
      "Measure your cognitive abilities and explore your intellectual potential",
  },

  personality: {
    queryCode: "personality",
    name: "Personality Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: FaTheaterMasks,
    description:
      "Gain insights into your personality traits and behaviors to better understand yourself",
  },

  stream: {
    queryCode: "stream",
    name: "Stream Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: PiCertificateFill,
    description:
      "Determine the ideal academic stream science, arts,or commerce for your future path",
  },

  strength: {
    queryCode: "strength",
    name: "Strength Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: PiBarbellFill,
    description:
      "Identify your unique strengths and talents to maximize your potential",
  },

  vark: {
    queryCode: "vark",
    name: "VARK Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: IoEar,
    description:
      "Discover your preferred learning style to enhance your study strategies",
  },

  english: {
    queryCode: "english",
    name: "English Test",
    displayType: "mcq",
    evaluationType: "single-option",
    icon: TbAbc,
    description:
      "Test your English proficiency to enhance your language skills and communication abilities",
  },

  study: {
    queryCode: "study",
    name: "Study Habits Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: FaBookReader,
    description:
      "Analyze your study habits to identify strengths and areas for improvement",
  },

  eq: {
    queryCode: "eq",
    name: "EQ Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: MdOutlineEmojiEmotions,
    description:
      "Evaluate your emotional intelligence to understand and manage your emotions effectively",
  },

  career: {
    queryCode: "career",
    name: "Career Aptitude Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: MdWork,
    description:
      "Discover your aptitude for different career paths based your career based skills.",
  },

  time: {
    queryCode: "time",
    name: "Time Management Test",
    displayType: "mcq",
    evaluationType: "ranged-score",
    icon: MdOutlineTimer,
    description:
      "Evaluate your time management skills to improve productivity and efficiency",
  },

  motivation: {
    queryCode: "motivation",
    name: "Motivation Assessment Test",
    displayType: "mcq",
    evaluationType: "ranged-score",
    icon: IoRocket,
    description:
      "Assess your motivation levels to understand what drives you to achieve your goals",
  },

  creativity: {
    queryCode: "creativity",
    name: "Creativity Test",
    displayType: "mcq",
    evaluationType: "ranged-score",
    icon: FaLightbulb,
    description:
      "Measure your creative thinking skills and explore your potential for innovative ideas",
  }, 
};



export { testMetaData };