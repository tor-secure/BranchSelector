import React from 'react';
import { BiSolidBrain } from "react-icons/bi";
import { FaBookReader, FaLightbulb, FaRocket, FaStethoscope, FaTheaterMasks } from "react-icons/fa";
import { GiPaintBrush, GiStumpRegrowth } from "react-icons/gi";
import { IoEar, IoRocket } from "react-icons/io5";
import { MdEngineering, MdOutlineEmojiEmotions, MdOutlineTimer, MdWork } from "react-icons/md";
import { PiBarbellFill, PiCertificateFill } from "react-icons/pi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { TbAbc } from "react-icons/tb";
import { TfiThought } from "react-icons/tfi";
import { IoIosPeople } from "react-icons/io";
import { FaPeopleRoof } from "react-icons/fa6";

//Test metadata determines how the test will appear to the user and how it will be evaluated. 
//Refer technical docs for more details.

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
  medical: {
    queryCode: "medical",
    name: "Medical Aptitude Test",
    displayType: "mcq",
    evaluationType: "ranged-score",
    icon: FaStethoscope,
    description:
      "Evaluate your interests and preferences on various medical fields and specialties",
  },
  decision: {
    queryCode: "decision",
    name: "Decision Style Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: TfiThought,
    description:
      "Identify your Dominant Decision-Making Style and how you approach decisions",
  },
  future: {
    queryCode: "future",
    name: "Future Technology Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: GiStumpRegrowth,
    description:
      "Identify your approach to embracing and leveraging future technologies",
  },
  entrepreneur: {
    queryCode: "entrepreneur",
    name: "Entrepreneurial Aptitude Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: IoIosPeople,
    description:
      "Assess your entrepreneurial mindset by evaluating your preferences and behaviors",
  },
  social: {
    queryCode: "social",
    name: "Social Skills Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: FaPeopleRoof,
    description:
      "Evaluate your ability to interact effectively with others and understanding social cues",
  },
  board: {
    queryCode: "board",
    name: "Board Selection Test",
    displayType: "mcq",
    evaluationType: "aggregation",
    icon: FaPeopleRoof,
    description:
      "Know the ideal education board after Class 10 based on your capabilities",
  }
};

const testStaticContent = {
  engineering: {
    description:"The Engineering test assesses your grasp of core engineering principles and methods, focusing on design, analysis, and problem-solving.",
    motive:"Taking the Engineering test can help you identify your strengths in technical fields and guide you toward a career in engineering or related disciplines.",
    resultIntroText:"Based on your answers, here are the top 5 engineering streams that will best suit your interest.",
    resultExplaination:{
        "Civil Engineering": "Focuses on the design, construction, and maintenance of infrastructure projects such as roads, bridges, dams, and buildings. Civil engineers ensure these structures are safe, sustainable, and efficient.",
        "Mechanical Engineering": "Involves the design, analysis, and manufacturing of mechanical systems. This includes engines, machines, and tools, with applications in industries like automotive, aerospace, and energy.",
        "Electrical Engineering": "Centers on the study and application of electricity, electronics, and electromagnetism. Electrical engineers work on projects involving power generation, communication systems, and electronic devices.",
        "Aerospace Engineering": "Focuses on the development of aircraft and spacecraft. This includes the design, testing, and production of systems and vehicles for aviation and space exploration.",
        "Chemical Engineering": "Combines principles of chemistry, biology, and physics to develop processes for manufacturing chemicals, pharmaceuticals, and other products. This field also addresses issues like energy production and environmental protection.",
        "Computer Engineering": "Involves the design and development of computer systems and components. This includes hardware, software, and networks, with applications in areas such as robotics, artificial intelligence, and data processing.",
        "Biomedical Engineering": "Applies engineering principles to the medical field. This includes developing medical devices, imaging equipment, and biocompatible materials to improve healthcare outcomes.",
        "Environmental Engineering": "Focuses on solving environmental problems through engineering. This includes water and air pollution control, waste management, and sustainable design to protect and improve the natural environment.",
        "Industrial Engineering": "Optimizes complex processes and systems to improve efficiency, productivity, and quality. Industrial engineers work in manufacturing, logistics, healthcare, and other industries to streamline operations.",
        "Nuclear Engineering": "Involves the application of nuclear processes and principles. This includes the development of nuclear reactors, radiation safety, and the use of radioactive materials in medical and industrial applications.",
        "Materials Engineering": "Studies the properties, performance, and applications of materials. Materials engineers develop new materials and improve existing ones for use in a variety of products and technologies.",
        "Petroleum Engineering": "Focuses on the extraction and production of oil and gas. Petroleum engineers design and implement methods for efficient and safe resource recovery, including drilling and reservoir management.",
        "Structural Engineering": "A branch of civil engineering that deals with the design and analysis of structures that support or resist loads. Structural engineers ensure that buildings, bridges, and other structures are safe and stable.",
        "Geotechnical Engineering": "Involves the study of soil and rock behavior for use in construction. Geotechnical engineers analyze ground conditions and design foundations, retaining structures, and other earthworks.",
        "Robotics Engineering": "Combines mechanical, electrical, and computer engineering to design and develop robots. This includes autonomous systems, industrial robots, and robotic devices for various applications.",
        "Software Engineering": "Focuses on the design, development, and maintenance of software systems. Software engineers create applications, systems software, and manage software development processes.",
        "Automotive Engineering": "Involves the design, development, and production of vehicles. Automotive engineers work on improving vehicle performance, safety, and efficiency, as well as developing new technologies.",
        "Agricultural Engineering": "Applies engineering principles to agriculture. This includes designing machinery, improving farming practices, and developing technologies for food production and resource management.",
        "Marine Engineering": "Focuses on the design, construction, and maintenance of ships and offshore structures. Marine engineers work on propulsion systems, navigation, and safety systems for marine vessels.",
        "Biotechnology Engineering": "Combines biology and engineering to develop products and technologies. Biotechnology engineers work on genetic engineering, biofuels, pharmaceuticals, and other applications.",
        "Mechatronics Engineering": "Integrates mechanical, electrical, and computer engineering to create smart systems and products. Mechatronics engineers develop automation systems, robotics, and advanced manufacturing technologies.",
        "Systems Engineering": "Focuses on the design and management of complex systems. Systems engineers ensure that different components of a system work together efficiently and effectively.",
        "Architectural Engineering": "Combines engineering and architecture principles to design and construct buildings. Architectural engineers focus on the structural, mechanical, and electrical systems within buildings.",
        "Mining Engineering": "Involves the extraction of minerals from the earth. Mining engineers design and implement safe and efficient methods for mining operations and resource management.",
        "Acoustic Engineering": "Focuses on the design, development, and analysis of systems that produce, transmit, or control sound. This includes areas like audio equipment, noise control, and architectural acoustics.",
        "Water Resources Engineering": "Deals with the management and distribution of water. Water resources engineers design systems for water supply, irrigation, flood control, and wastewater treatment.",
        "Transportation Engineering": "Focuses on the design, construction, and maintenance of transportation systems. This includes roads, railways, airports, and public transit systems to ensure efficient and safe movement of people and goods.",
        "Optical Engineering": "Involves the design and application of optical systems. Optical engineers work on lenses, lasers, fiber optics, and imaging systems for use in various technologies.",
        "Telecommunication Engineering": "Centers on the transmission of information across channels such as cables, satellites, and wireless systems. Telecommunication engineers design and manage communication networks and devices.",
        "Renewable Energy Engineering": "Focuses on the development and implementation of sustainable energy sources. Renewable energy engineers work on solar, wind, hydro, and other renewable technologies to reduce dependence on fossil fuels."
    }
  },

  iq: {
    description:"The IQ test evaluates cognitive abilities such as reasoning, numerical skills, and spatial awareness, providing an estimation of overall intelligence.",
    motive:"Understanding your IQ can help in recognizing your intellectual strengths, guiding career choices in areas that match your cognitive capabilities and allowing for targeted development in areas that require improvement.",
    resultIntroText:"Based on the questions you answered, your IQ score is",
    resultExplaination:{
    "History": "The concept of intelligence quotient (IQ) was developed in the early 20th century by psychologists like Alfred Binet and Lewis Terman. Initially used to identify children needing educational assistance, IQ testing has evolved to assess various cognitive abilities and is widely used in both educational and professional settings.",
    "Importance": "IQ tests are used to measure a person's cognitive abilities relative to others. High IQ scores are often associated with academic and professional success, though they do not capture all aspects of intelligence, such as emotional and social intelligence. They can help identify strengths and weaknesses in cognitive functioning.",
    "Applications": "IQ tests are used in various fields, including education, psychology, and human resources. They help in identifying gifted individuals, diagnosing learning disabilities, and informing decisions in hiring and career development.",
    "Types of IQ Tests": "There are various types of IQ tests, such as the Stanford-Binet, Wechsler Adult Intelligence Scale (WAIS), and Raven's Progressive Matrices. Each test has different formats and focuses on measuring different cognitive abilities.",
    "Limitations": "While IQ tests provide valuable insights into certain cognitive abilities, they do not measure creativity, emotional intelligence, practical skills, or other important aspects of human intelligence. They should be used as one of multiple tools in assessing cognitive abilities."
  }
  },

  vark: {
    description:"The VARK model, developed by Neil Fleming in 1987, stands for Visual, Aural/Auditory, Read/Write, and Kinesthetic learning styles.",
    motive:"Understanding your learning style through the VARK test can enhance your study techniques and improve educational outcomes, making learning more efficient and tailored to your needs.",
    resultIntroText:"Based on questions you answered, your preferred learning method is",
    resultExplaination:{
    "Visual":
      "Individuals with a strong visual learning preference tend to learn best through the use of images, diagrams, charts, and other visual aids. They often excel at processing information presented in a visual format, and may benefit from learning materials that incorporate visual elements, such as PowerPoint presentations, infographics, or video demonstrations.",
    "Auditory":
      "Individuals with a strong auditory learning preference tend to learn best through listening and processing information through sound. They often excel at remembering verbal instructions, enjoy participating in discussions, and may benefit from audio recordings or lectures.",
    "Read/Write":
      "Individuals with a strong read/write learning preference tend to learn best through reading and writing. They often excel at processing information presented in textual formats, such as books, articles, or written instructions, and may benefit from opportunities to take notes, create summaries, or engage in written exercises.",
    "Kinesthetic":
      "Individuals with a strong kinesthetic learning preference tend to learn best through hands-on experience, physical movement, and tactile engagement. They often thrive in environments that allow them to actively manipulate or interact with the learning material, and may enjoy activities that involve hands-on demonstrations or experiential learning.",
  }
  },

  brain: {
    description:"The Brain test examines cognitive functions like memory, problem-solving, and creativity, offering insights into your mental strengths.",
    motive:"By understanding your cognitive strengths and weaknesses, the Brain test can help you leverage your natural talents in both educational and professional settings, allowing for more effective learning and decision-making strategies.",
    resultIntroText:"Based on the questions you answered, your dominant brain hemisphere is calculated to be",
    resultExplaination:{
      "Left Brain": "Individuals who favor left-brain thinking are often analytical, logical, and detail-oriented. They excel in tasks that require reasoning, organization, and systematic problem-solving. These individuals tend to be good with numbers, language, and facts, preferring structured environments where they can apply their methodical approach.",
      "Right Brain": "Individuals who favor right-brain thinking are often creative, intuitive, and holistic in their approach. They excel in tasks that involve imagination, pattern recognition, and spatial awareness. These individuals are typically good at art, music, and understanding emotions, thriving in environments that allow for flexibility and innovative thinking."
    }
  },

  stream: {
    description:"The Stream test explores your interests and aptitudes across disciplines like arts, commerce, and science, guiding educational and career choices.",
    motive:"This test helps you determine the best educational stream to pursue, based on your interests and strengths, ensuring you choose a path that aligns with your career goals and passion.",
    resultIntroText:"Based on the questions you answered, the best stream for you will be",
    resultExplaination:{
    "Arts": "This score indicates a moderate level of interest and engagement with the arts, including areas such as visual arts, music, literature, and creative expression. Individuals with this score may appreciate and enjoy the arts, but they may not necessarily prioritize them as a primary focus or area of expertise.",
    "Commerce":
      "This score suggests a strong interest and aptitude for commerce-related activities, such as business, finance, economics, and entrepreneurship. Individuals with this profile may be drawn to roles that involve managing resources, making strategic decisions, and engaging in commercial endeavors.",
    "Science":
      "This score indicates a high level of interest and ability in the scientific realm, encompassing fields such as mathematics, engineering, technology, and research. Individuals with this profile are likely to be curious, analytical, and driven to explore and understand the natural and physical world through systematic investigation and experimentation.",
    }
  },  
  
  strength: {
    description:"The Strength test identifies your unique talents and strengths across dimensions like communication, adaptability, and strategic thinking.",
    motive:"Understanding your learning style through the VARK test can enhance your study techniques and improve educational outcomes, making learning more efficient and tailored to your needs.",
    resultIntroText:"Based on your answers, your most dominant strength is",
    resultExplaination:  {
    "Achiever": "Individuals with a strong drive to accomplish goals are often self-motivated, ambitious, and take pride in their accomplishments. They excel in being productive and delivering results.",
    "Adaptability": "Those with a high level of flexibility and openness to change are adept at adjusting to new situations. They thrive in dynamic environments and are comfortable with uncertainty, able to pivot quickly when needed.",
    "Communication": "People with a well-developed ability to express ideas and share information effectively are articulate, persuasive, and skilled at fostering understanding. They connect with others easily and communicate clearly.",
    "Developer": "Individuals who focus on nurturing and supporting the growth of others often take on roles as mentors, coaches, or collaborators. They find satisfaction in helping people reach their full potential.",
    "Empathy": "People with a moderate level of emotional intelligence can understand and share the feelings of others. While they can empathize, they may not always prioritize emotional considerations in their decision-making.",
    "Ideation": "Those who generate innovative ideas and explore unconventional solutions are imaginative and curious. They engage in creative problem-solving and are comfortable with ambiguity.",
    "Maximizer": "Individuals who prefer satisficing over maximizing are less inclined to strive for perfection. They focus on achieving satisfactory outcomes rather than optimizing every detail.",
    "Positivity": "People with a moderately positive outlook bring a sense of optimism and encouragement to their interactions. They uplift and motivate others, even if they are not the most enthusiastic or cheerful.",
    "Strategic": "Those with a moderate inclination towards strategic thinking can anticipate future challenges and identify opportunities. They are capable of formulating comprehensive plans but may sometimes prioritize immediate concerns over long-term planning.",
    "Woo": "Individuals who are skilled at networking and building relationships use their warmth and charm to win others over. They are persuasive and excel in interpersonal interactions."
  }
  },

  interest: {
    description:"The Interest test delves into your preferences and inclinations across various domains, aiding in identifying areas of personal fulfillment.",
    motive:"The Interest test can guide you in choosing a career or educational path that aligns with your passions and interests, leading to greater satisfaction and success in your chosen field.",
    resultIntroText:"Based on your answers, your interest lies in",
    resultExplaination:{
    Artistic:
      "Individuals with a strong artistic personality tend to be creative, imaginative, and expressive. They often enjoy working in fields like art, design, music, or writing, where they can use their talents to bring their ideas to life. Artistic personalities may be drawn to roles that allow them to be innovative and visually or aesthetically oriented.",
    Conventional:
      " People with a conventional personality type typically prefer structure, order, and working within established systems and procedures. They often excel at tasks that involve organization, attention to detail, and following set protocols. Conventional personalities may thrive in fields like accounting, finance, or administration, where they can apply their strong organizational and analytical skills.",
    Enterprising:
      "Individuals with an enterprising personality are often ambitious, assertive, and drawn to leadership roles. They enjoy working in environments that allow them to be persuasive, take initiative, and make decisions. Enterprising personalities may be well-suited for careers in sales, marketing, entrepreneurship, or management, where they can utilize their strong communication and problem-solving abilities.",
    Investigative:
      " People with an investigative personality type tend to be curious, analytical, and intellectually driven. They often excel at tasks that involve research, problem-solving, and understanding complex systems or theories. Investigative personalities may be drawn to fields like science, engineering, or academia, where they can explore their interests and apply their critical thinking skills.",
    Realistic:
      "Individuals with a realistic personality are typically practical, hands-on, and prefer concrete, tangible tasks. They often enjoy working with tools, machinery, or physical materials, and may be skilled at troubleshooting or repairing things. Realistic personalities may be well suited for careers in trades, construction, manufacturing, or other applied technical fields.",
    Social:
      " People with a social personality type are generally empathetic, collaborative, and enjoy working with others. They often excel at roles that involve helping, teaching, or interacting with people. Social personalities may be drawn to careers in healthcare, education, counseling, or human resources, where they can utilize their strong interpersonal and communication skills.",
  }
  },  
  
  personality: {
    description:"The Personality test analyzes traits like agreeableness, conscientiousness, and openness, aiding in self-understanding and interaction.",
    motive:"The Personality test provides valuable insights into your interpersonal skills and traits, helping you choose a career path that aligns with your personality and improves workplace relationships.",
    resultIntroText:"Based on your answers, your most dominant personality trait is",
    resultExplaination:{
    Agreeableness:
      "This trait reflects an individual's tendency to be cooperative, compassionate, and trusting. People with high agreeableness are often described as kind, considerate, and willing to compromise. They tend to value harmony in their relationships and are generally more cooperative and less confrontational.",
    Conscientiousness:
      "This trait represents an individual's level of organization, self-discipline, and goal-orientation. People with high conscientiousness are typically reliable, disciplined, and detail-oriented. They tend to plan ahead, prioritize their tasks, and strive to achieve their goals.",
    Extraversion:
      "Extraversion reflects an individual's sociability, energy, and enthusiasm. People with high extraversion are often described as outgoing, talkative, and comfortable in social situations. They tend to enjoy being around others and may seek out opportunities to socialize.",
    Neuroticism:
      "Neuroticism represents an individual's emotional stability and tendency to experience negative emotions, such as anxiety, depression, and irritability. People with high neuroticism may be more sensitive to stress and have a lower tolerance for uncertainty.",
    Openness:
      "Individuals high in openness tend to be imaginative, creative, and curious about the world around them. Keywords: Creative, Imaginative, Curious, Unconventional, Open-minded",
  }
  },

  english: {
    description:"The English test evaluates language proficiency, encompassing reading, writing, listening, and speaking skills for effective communication.",
    motive:"Improving your English skills through this test can enhance your communication abilities, crucial for career success in almost any field, especially in global and multicultural workplaces.",
    resultIntroText:"Based on the questions you answered, your english grade is",
    resultExplaination:{
    "Reading Comprehension": "Assesses the ability to understand, interpret, and analyze written texts. This includes identifying main ideas, details, and inferences within various types of passages.",
    "Writing": "Evaluates the ability to compose clear, coherent, and well-structured written responses. This includes grammar, punctuation, style, and organization in essays or short answers.",
    "Listening Comprehension": "Measures the ability to understand and process spoken English. This includes identifying main ideas, specific details, and the overall gist of conversations, lectures, and other audio materials.",
    "Speaking": "Tests the ability to speak English fluently and accurately. This includes pronunciation, vocabulary usage, grammatical correctness, and the ability to express ideas coherently in various contexts.",
    "Grammar and Vocabulary": "Assesses knowledge of English grammar rules and vocabulary. This includes identifying correct grammatical structures, appropriate word usage, and understanding nuances in meaning.",
    "Literary Analysis": "Evaluates the ability to analyze and interpret literary texts. This includes understanding themes, characters, plot development, and literary devices used in poetry, prose, and drama."
  }
  },

  eq: {
  description:"The EQ test measures emotional intelligence, including self-awareness, self-regulation, motivation, empathy, and relationship management.",
  motive:"A high EQ is essential for leadership roles and team-based environments. Understanding your emotional intelligence can guide you toward roles where these skills are paramount.",
  resultIntroText:"Based on the questions you answered, your most dominant EQ trait is",
  resultExplaination:{
  "Self Awareness": 
    "The ability to recognize and understand your own emotions, strengths, weaknesses, and drives. This includes being aware of the impact of your emotions on your thoughts and behaviors. Self-awareness helps in making better decisions and managing emotions in different situations. It involves self-reflection and the ability to assess oneself objectively.",
  "Self Regulation": 
    "The ability to control or redirect disruptive emotions and impulses, and adapt to changing circumstances. This includes managing stress, maintaining self-discipline, and staying calm under pressure. Self-regulation allows individuals to think before acting and express emotions appropriately. It involves self-control, trustworthiness, and conscientiousness.",
  "Motivation": 
    "The drive to achieve goals for personal satisfaction rather than external rewards. This includes setting high standards for yourself and striving to meet them. Motivated individuals are passionate about their work, resilient in the face of setbacks, and persistent in achieving their objectives. They often exhibit a strong desire for personal growth and accomplishment.",
  "Empathy": 
    "The ability to understand and share the feelings of others. This helps in building strong relationships and responding appropriately to social situations. Empathy involves recognizing emotional cues, listening actively, and showing compassion. It enables individuals to connect with others on an emotional level, fostering trust and collaboration.",
  "Relationship Management": 
    "The ability to develop and maintain good relationships, communicate clearly, inspire and influence others, work well in a team, and manage conflict. This includes effective communication, conflict resolution, and the ability to influence and inspire others. Strong relationship management skills help in building and maintaining healthy, productive, and rewarding relationships in both personal and professional settings."
  }
  },  
  
  study: {
    description:"The Study Habits test analyzes your study habits to identify strengths and areas for improvement.",
    motive:"Improving your study habits can enhance your educational performance, helping you achieve your academic goals and prepare for future career challenges.",
    resultIntroText:"Based on the questions you answered, the best trait about your study habits is",
    resultExplaination:{
    "Learning Environment": 
      "The quality and organization of your study space and comfort level. A well-organized, comfortable, and distraction-free environment can enhance your focus and efficiency during study sessions, while a cluttered or uncomfortable space can hinder your ability to concentrate and retain information.",
    "Motivation": 
      "Your intrinsic and extrinsic motivators and how they drive your study habits. Understanding what drives you to study—whether it's personal satisfaction, curiosity, achieving long-term goals, or external rewards—can help you stay committed and improve your academic performance.",
    "Stress Management": 
      "How well you manage stress, maintain well-being, and balance academic demands. Effective stress management involves strategies to cope with academic pressure, maintain a healthy lifestyle, and find a balance between studies and personal life, ensuring that stress does not negatively impact your academic success and overall well-being.",
    "Resilience": 
      "Your ability to handle setbacks, adapt to changes, persist in your studies, and seek feedback constructively. Being resilient means you can bounce back from challenges, stay motivated despite difficulties, and continuously improve by learning from feedback and adapting your study strategies as needed.",
    "Self Improvement": 
      "Your commitment to reflecting on and improving your study habits, trying new methods, seeking resources, and self-assessing your progress. Regularly evaluating and refining your study techniques, being open to new approaches, and actively seeking resources to aid your learning can lead to continuous academic growth and success.",
    "Learning Tools": 
      "How effectively you utilize technology, online resources, digital tools, and educational apps/software to aid your studies. Leveraging modern learning tools can enhance your study efficiency, provide access to a wealth of information, and offer innovative ways to understand and retain knowledge.",
    "Support Seeking": 
      "How often you seek academic support from study groups, teachers, mentors, family, friends, tutoring services, or academic support centers. Actively seeking help and collaborating with others can provide different perspectives, clarify doubts, and offer emotional and academic support, contributing to a more effective and enjoyable learning experience."
  }
  },

  career: {
    description:"The Career Aptitude test assesses your skills to thrive in your career.",
    motive:"Identifying your career aptitudes can help you focus on developing skills that will enhance your career progression and success in your chosen field.",
    resultIntroText:"Based on the questions you have answered, your best skill for your career is",
    resultExplaination:{
    "Analytical Skills": "Your ability to examine information, identify patterns, and solve complex problems is heavily weighted in many questions, indicating its importance in various career paths. Strong analytical skills can lead to success in fields such as data analysis, scientific research, and strategic planning. Examples of careers that heavily rely on analytical skills include data analyst, financial analyst, research scientist, systems engineer, business intelligence analyst, actuary, epidemiologist, and forensic scientist.",
    "Communication Skills": "Your capacity to express ideas clearly, listen effectively, and interact with others is frequently valued across different scenarios, often paired with teamwork. Effective communication is crucial in roles involving client interaction, team collaboration, and leadership. Careers that particularly value communication skills include public relations specialist, marketing manager, human resources manager, journalist, corporate trainer, content writer, public speaking coach, and customer success manager.",
    "Teamwork": "Your ability to collaborate, contribute to group efforts, and work harmoniously with others is often positively weighted, indicating its importance in modern workplaces. Strong teamwork skills are valuable in project-based work, cross-functional teams, and collaborative environments. Careers that heavily emphasize teamwork include project manager, social worker, event planner, nurse, teacher, community organizer, athletic coach, and operations manager.",
    "Decision Making": "Your capacity to evaluate options, make choices, and take action has varying weights across different scenarios, sometimes with negative impacts when avoiding decisions. Good decision-making skills are crucial for leadership roles, project management, and entrepreneurship. Careers that require strong decision-making skills include business executive, entrepreneur, judge, emergency room doctor, air traffic controller, military officer, investment banker, and political campaign manager.",
    "Creative Problem Solving": "Your ability to think innovatively and develop unique solutions to challenges is often highly weighted, particularly in scenarios requiring new approaches. Creative problem-solving is valuable in fields such as design, product development, and strategic planning. Careers that rely heavily on creative problem-solving include graphic designer, software developer, architect, advertising creative director, product manager, user experience (UX) designer, industrial designer, and marketing strategist.",
    "Organizational Skills": "Your ability to plan, prioritize, and manage tasks efficiently is positively weighted in many scenarios, particularly those involving project planning or time management. Strong organizational skills are important in project management, administrative roles, and leadership positions. Careers that require excellent organizational skills include project coordinator, executive assistant, event manager, logistics coordinator, office manager, librarian, wedding planner, and construction manager.",
    "Leadership": "Your capacity to guide, influence, and motivate others is often positively weighted, particularly in scenarios involving team management or strategic decision-making. Leadership skills are crucial for management positions, entrepreneurship, and roles involving team coordination. Careers that require strong leadership skills include CEO, school principal, political leader, nonprofit executive director, restaurant manager, sports team coach, military officer, and startup founder.",
    "Adaptability": "Your ability to adjust to new conditions and handle change effectively, while not explicitly named in our previous data, is implied in scenarios valuing flexibility and handling unexpected challenges. Adaptability is increasingly important in rapidly changing industries and roles requiring quick responses to new situations. Careers that particularly value adaptability include management consultant, entrepreneur, emergency response coordinator, international aid worker, digital marketing specialist, supply chain manager, travel agent, and freelance professional."
  }
  },

  time: {
    description:"The Time Management test assesses your ability to prioritize tasks, manage time efficiently, and maintain productivity under various conditions.",
    motive:"Effective time management is crucial for success in any career. This test can help you identify areas for improvement, ensuring you maximize productivity and balance work-life demands.",
    resultIntroText:"Based on the questions you have answered, your time management score is",
    resultExplaination:{
    "Excellent time management skills":"You have a well-organized approach and effectively balance your tasks and time.",
    "Good time management skills": "You manage your time well but could benefit from slight improvements in planning and handling interruptions.",
    "Fair time management skills.": "You have some good habits but need to work on consistency and handling distractions better.",
    "Poor time management skills.": "You should consider restructuring your approach to time management and adopting new strategies to improve your productivity."
  }
  },

  motivation: {
    description:"The Motivation Assessment test explores what drives you to set and achieve goals, providing insights into your intrinsic and extrinsic motivators.",
    motive:"Understanding your motivators can help you set effective goals and pursue a career path that aligns with your values and drive, leading to sustained job satisfaction and success.",
    resultIntroText:"Based on the questions you have answered, your motivation score is",
    resultExplaination:{
    "Highly motivated": "You are driven and use various strategies to maintain and boost your motivation.",
    "Motivated": "You have a good level of motivation but can benefit from improving certain aspects.",
    "Moderately motivated": "You experience fluctuations in your motivation and could work on consistency.",
    "Low motivation": "You need to find new ways to inspire and motivate yourself to reach your goals."
  }
  },  
  
  creativity: {
    description:"The Creativity test evaluates your ability to think outside the box, generate innovative ideas, and approach problems with originality.",
    motive:"Creativity is highly valued in many industries. Understanding your creative potential can guide you toward roles that require innovative thinking and problem-solving skills.",
    resultIntroText:"Based on the questions you have answered, your creativity score is",
    resultExplaination:{
    "Highly creative":"You excel at thinking outside the box and are constantly generating new ideas.",
    "Very creative": "You have a strong creative drive and frequently come up with innovative solutions.",
    "Moderately creative": "You have good creative potential but could benefit from further developing your skills and confidence.",
    "Low creativity": "You may need to explore new ways to stimulate your creativity and embrace innovative thinking."
  }
  },

  medical: {
    description:"A medical interest test is typically designed to assess an individual's interest in various aspects of the medical field.",
    motive:"Understanding your interest in the medical field can guide you toward a career in healthcare, helping you choose a specialty that aligns with your passion and aptitude.",
    resultIntroText:"Based on the questions you have answered, we have identified your suitability for the medical field as",
    resultExplaination:{
    "Not suitable": "You may find the medical or paramedical field challenging. It might be beneficial to explore other career options that better suit your strengths and interests.",
    "Potentially suitable": "You have the potential for a career in the medical or paramedical field. While some areas may need further development, you have a good foundation to build on.",
    "Well-suited": "You possess many qualities well-suited for the medical or paramedical field. This could be a fulfilling career path for you, though some minor improvements might be necessary.",
    "Highly suitable": "You are highly suited for a career in the medical or paramedical field. Your skills, interests, and qualities strongly align with the demands of these professions, making you an excellent candidate."
  }
  },

  decision: {
    description:"The Decision Making Style test evaluates your approach to making choices, considering factors like risk tolerance, information processing, and decision-making strategies.",
    motive:"Understanding your decision-making style can help you make better choices, improve your problem-solving skills, and enhance your leadership abilities.",
    resultIntroText:"Based on the questions you have answered, your dominant decision-making style is",
    resultExplaination:{
      "Impulsive Decision-Maker": "Impulsive decision-makers act quickly without spending much time analyzing or seeking advice. They prioritize speed and rely on their instincts to make decisions. While this style can be advantageous in time-sensitive situations, it often overlooks potential consequences or alternative solutions. Such individuals tend to trust their gut and are comfortable with uncertainty, which can sometimes lead to success but may also result in errors or missed opportunities.\n\nThis style is effective in dynamic or high-pressure environments where quick decisions are required. However, impulsive decision-makers should strive to balance their natural instinct with a bit of planning or reflection. Taking a moment to evaluate options or consult with others can help avoid rash decisions and achieve more consistent success.",
      "Intuitive Decision-Maker": "Intuitive decision-makers rely on their inner feelings or “gut” to guide their choices. They are often highly creative and rely on experience or emotional cues to navigate decisions. This approach can be highly effective when dealing with complex or ambiguous problems where logic may not provide clear answers. Intuitive thinkers often feel a strong sense of confidence in their decisions, even without hard data to back them up.\n\nWhile intuition can be a powerful tool, it is important for such individuals to balance it with some level of fact-checking or analysis, especially for critical decisions. By incorporating logical elements into their process, intuitive decision-makers can enhance the reliability of their instincts and build more robust solutions.",
      "Collaborative Decision-Maker": "Collaborative decision-makers prefer to involve others in their decision-making process. They value input from peers, mentors, or teammates, believing that diverse perspectives lead to better outcomes. This style promotes teamwork and ensures that all stakeholders feel included, making it particularly effective in group or organizational settings. Collaborative individuals are excellent at resolving conflicts and finding consensus-based solutions.\n\nHowever, relying too heavily on others can sometimes lead to delays or an inability to act decisively. To improve, collaborative decision-makers should work on developing confidence in their ability to make independent choices when necessary. Striking a balance between group input and personal judgment is key to maximizing this style's effectiveness.",
      "Logical/Analytical Decision-Maker": "Logical decision-makers focus on gathering facts, analyzing data, and weighing the pros and cons before making a choice. They excel in structured environments where careful planning and detailed evaluation are required. This style minimizes risks and ensures that decisions are well-informed, making it ideal for long-term planning or high-stakes situations.\n\nWhile this method is thorough, it can sometimes lead to overthinking or delays in action. Analytical decision-makers may benefit from learning to trust their instincts or making quicker decisions in situations where perfect information isn’t available. By blending logic with intuition, they can become more adaptable while maintaining their strength in strategic planning."
    }
  },

  future: {
    description:"The Future Technology test assesses your readiness and openness to adopting new technologies and innovations.",
    motive:"Understanding your approach to future technologies can help you prepare for upcoming trends, stay competitive in your field, and leverage emerging tools and platforms.",
    resultIntroText:"Based on the questions you have answered, your future technology score is",
    resultExplaination:{
      "Innovator": "Innovators are forward-thinkers who thrive on groundbreaking ideas and technological disruption. They are passionate about solving complex problems with cutting-edge tools and thrive on discovering novel applications for emerging technologies. Innovators often envision bold futures, such as building sustainable energy solutions or revolutionizing industries with AI. With a knack for strategic thinking and a strong belief in the transformative power of technology, Innovators are at the forefront of shaping a better tomorrow. They excel in roles that demand innovation, whether in research, product development, or leading tech startups.",
      "Creator": "Creators are artistic individuals who see technology as a canvas for boundless imagination. They are fascinated by how technology can expand creative possibilities, whether through digital art, augmented reality, or designing user-centric experiences. Creators value aesthetics, storytelling, and innovation in crafting unique outputs. Their ability to combine technical skills with artistic vision makes them instrumental in areas such as multimedia production, game design, and experiential marketing. Creators focus on making technology beautiful and meaningful, helping others to connect emotionally with future advancements.",
      "Connector": "Connectors view technology as a bridge to bring people and ideas together. They prioritize collaboration, communication, and building networks through emerging tools. Whether it's fostering global teams, enabling access to education, or supporting online communities, Connectors leverage technology to unify and empower others. With a strong focus on relationships, Connectors thrive in roles like community management, HR tech, or international outreach. Their empathetic and social approach ensures that future technologies enhance human connections and foster collective progress.",
      "Practitioner": "Practitioners focus on the practical and functional applications of technology. They are adept at using technological tools to improve efficiency, optimize processes, and deliver results. Whether in healthcare, manufacturing, or data management, Practitioners excel at ensuring technology serves real-world needs. Their grounded perspective and methodical approach make them vital in operations, IT infrastructure, and technical support roles. Practitioners balance innovation with usability, ensuring that technologies are accessible, reliable, and impactful in everyday life."
    }
  },

  entrepreneur: {
    description:"The Entrepreneurial Aptitude test evaluates your mindset, skills, and preferences related to entrepreneurship and business ownership.",
    motive:"Understanding your entrepreneurial aptitude can guide you in pursuing entrepreneurial ventures, developing business ideas, and honing the skills needed for success in the business world.",
    resultIntroText:"Based on the questions you have answered, your entrepreneurial aptitude score is",
    resultExplaination:{
      "Risk Taker": "Entrepreneurs in this category are bold and willing to take significant risks for the chance of high rewards. They thrive in uncertain environments and often prioritize innovation and big-picture thinking over detailed planning. They embrace the unknown and are eager to disrupt industries, viewing challenges as opportunities for growth. However, their enthusiasm for risk can sometimes lead to impulsive decisions, which may result in financial setbacks or failure if not managed carefully. These entrepreneurs are likely to find success in highly dynamic and competitive fields, where innovation and speed are crucial.\n\nWhile they excel in environments that require quick, decisive actions, they might struggle with long-term strategic planning and may need a solid support team to help them stay grounded. Their strength lies in their ability to move quickly, which allows them to capitalize on emerging trends before others can react. A strong vision and a willingness to fail and learn are key traits of entrepreneurs in this category, and they are often seen as trailblazers who bring transformative ideas to life.",
      "Strategic Planner": "Strategic planners excel in detailed analysis and methodical decision-making. They prefer to thoroughly assess every opportunity, taking calculated risks based on data and careful consideration. These entrepreneurs are known for their organizational skills, ensuring that their business plans are solid and well-researched. They often take a long-term view of success, balancing both growth and sustainability. Their approach involves risk mitigation, relying on market analysis, projections, and contingencies to guide their decisions.\n\nStrategic planners are excellent at navigating stable industries or markets where a well-thought-out approach can create lasting value. While they may be more cautious and less likely to take bold risks, their ability to build a resilient, structured business provides them with a solid foundation for success. These entrepreneurs often excel in leadership positions, as they can provide direction, clarity, and consistency. Their challenge, however, may be the need to remain flexible and open to new opportunities in a rapidly changing market.",
      "Collaborator": "Entrepreneurs who fall under this category are team-oriented and excel in creating strong relationships with partners, customers, and stakeholders. They value collaboration and believe that success is best achieved through working with others. They are skilled in networking and are often the glue that holds teams together, fostering a culture of trust and cooperation. By listening to others and integrating diverse perspectives, these entrepreneurs often create businesses that are well-rounded and responsive to market needs.\n\nWhile they may not be as focused on individual risk-taking or autonomy, their strength lies in their ability to bring people together to achieve a shared vision. Collaborators thrive in environments where teamwork is essential, and they excel in roles that require negotiation, conflict resolution, and customer engagement. However, their focus on consensus may sometimes slow down decision-making, as they tend to seek input from multiple sources before taking action. These entrepreneurs are often successful in industries where partnerships, customer relationships, and social capital are key to success.",
      "Pragmatist": "Pragmatists are focused, results-driven entrepreneurs who prioritize practical solutions over theoretical or untested ideas. They value efficiency and action, preferring to implement ideas quickly and adjust based on real-world feedback. This category of entrepreneur tends to stay grounded in reality, focusing on the feasibility of their plans rather than abstract visions. Pragmatists often excel in businesses that require quick turnarounds, solid execution, and immediate results. Their ability to make swift, practical decisions allows them to maintain momentum and make progress in fast-paced environments.\n\nHowever, while their practical approach ensures steady progress, pragmatists may sometimes miss out on bigger opportunities that require a more visionary or risk-oriented mindset. They are often more focused on optimizing existing processes and minimizing waste rather than venturing into new, untested areas. The strength of a pragmatist entrepreneur lies in their ability to build and sustain businesses that are reliable, consistent, and capable of delivering on promises. Their challenge may be in recognizing when it’s time to innovate or pivot in response to changing market conditions."
    }  
  },

  social: {
    description:"The Social Skills test assesses your ability to interact effectively with others, understand social cues, and build positive relationships.",
    motive:"Improving your social skills can enhance your personal and professional relationships, leading to better communication, collaboration, and overall well-being.",
    resultIntroText:"Based on the questions you have answered, your social skills score is",
    resultExplaination:{
      "Effective Communicator": "People in this category are skilled at expressing themselves clearly and confidently. They excel in both verbal and non-verbal communication, ensuring their messages are understood by others. These individuals are active listeners, able to give full attention to others and respond thoughtfully. They often take the lead in conversations, maintaining a positive tone and ensuring that discussions are productive and respectful. Their ability to communicate effectively helps them navigate social situations with ease, whether in casual conversations or professional settings.\n\nEffective communicators can adapt their communication style to suit different audiences, which makes them excellent in roles that require frequent interaction with others. Their strength lies in building rapport quickly, making them highly approachable and influential in group settings. However, they might sometimes focus too much on being understood, leading to an overemphasis on talking instead of listening. To improve, they may need to balance their communication with deeper empathy and attentiveness to others’ needs.",
      "Empathizer": "Empathizers excel in understanding the emotions and perspectives of others. They are naturally compassionate and sensitive to how people feel, often offering support and comfort when needed. These individuals can put themselves in others’ shoes, which allows them to respond appropriately to the emotional needs of those around them. Empathizers are adept at fostering strong, meaningful relationships and are seen as trusted confidants due to their ability to listen without judgment and offer empathy.\n\nWhile they are excellent in one-on-one interactions and in understanding subtle social cues, empathizers may sometimes become overwhelmed by others’ emotions or take on too much emotional responsibility. Their challenge lies in finding a balance between being supportive and maintaining healthy emotional boundaries. Nonetheless, their capacity for emotional understanding makes them invaluable in both personal and professional settings, especially when managing teams or working closely with others who may be going through difficult situations.",
      "Conflict Resolver": "Conflict resolvers are skilled at managing and resolving disputes in a way that minimizes tension and promotes collaboration. They can identify the root causes of conflicts and work to mediate between opposing parties, fostering understanding and compromise. These individuals are composed under pressure, able to stay calm and focused when others might become emotional. Their ability to see different perspectives and find common ground makes them highly effective in situations that require negotiation and diplomacy.\n\nIn both personal and professional environments, conflict resolvers are crucial for maintaining harmony and ensuring that relationships stay strong. However, their desire to keep the peace may sometimes lead them to avoid addressing deeper issues, which can result in unresolved conflicts resurfacing. Their strength lies in their ability to facilitate positive outcomes during challenging situations, but they may need to work on addressing conflict head-on when necessary for long-term resolution.",
      "Social Navigator": "Social navigators excel in adapting to different social environments, easily fitting into diverse groups and building connections across various settings. They have a natural ability to read social dynamics, allowing them to navigate complex social situations with ease. Whether in formal business meetings or casual social gatherings, social navigators can adjust their behavior to suit the situation, ensuring they make a positive impression. They are often the ones who bring people together, connecting individuals from different backgrounds and fostering inclusivity.\n\nThese individuals are skilled at networking and creating opportunities for collaboration, making them valuable in roles that require relationship-building and leadership. However, their flexibility may sometimes lead to a lack of consistency in their interactions, as they may change their behavior to please others rather than being true to themselves. While they are great at making others feel comfortable, they may need to focus on maintaining authenticity in their social interactions to avoid appearing insincere. Nonetheless, their ability to thrive in various social settings makes them invaluable in team-oriented and leadership roles."
    }  
  },
  board: {
    description: "The Board Selection Test helps students choose the most suitable education board after Class 10 by analyzing their learning style, career aspirations, study preferences, and future goals. Based on their responses, the test suggests whether CBSE, ICSE, State Board, IB, IGCSE, or NIOS would be the best fit for them.",
    motive: "Helping students confidently choose the right education board after Class 10 based on their unique learning style, goals, and preferences.",
    resultIntroText: "Based on the questions you have answered, your Board Selection Test score is",
    resultExplanation: {
      "CBSE (Central Board of Secondary Education)": "CBSE is one of the most popular school boards in India, known for its structured and standardized curriculum. It is widely preferred by students who aim to prepare for national-level competitive exams like JEE, NEET, and UPSC, as its syllabus is aligned with these tests. The board emphasizes a balanced combination of theoretical and practical knowledge, making it ideal for students pursuing careers in science, technology, and commerce. Schools affiliated with CBSE follow NCERT textbooks, ensuring uniformity in education across India.\n\nCBSE’s assessment pattern includes term-based evaluations with a mix of objective and subjective questions. It encourages co-curricular activities but places greater emphasis on academics. The grading system is designed to reduce stress, and recent reforms have introduced competency-based learning. CBSE schools are available across India and even in some foreign countries, making it a flexible choice for students who may relocate frequently.",
      "ICSE (Indian Certificate of Secondary Education)": "The ICSE board is known for its comprehensive and detailed curriculum, with an emphasis on in-depth learning. It offers a strong foundation in languages, humanities, and sciences, making it a great choice for students who enjoy a well-rounded education. Unlike CBSE, ICSE places equal importance on all subjects, including literature, history, and environmental studies, providing an extensive knowledge base.\n\nICSE students often develop strong communication and analytical skills due to the board’s focus on essay-based answers. The board is beneficial for students planning to study abroad, as its curriculum is recognized internationally. However, the syllabus is vast and can be challenging, requiring students to have good time management skills. It is ideal for those interested in fields like law, arts, and management, where language proficiency and analytical thinking play a crucial role.",
      "State Board": "State boards are governed by individual state education departments and follow a curriculum designed to meet regional academic and cultural needs. Each state board has its syllabus and language preferences, making it an excellent choice for students who plan to pursue higher education within the same state. These boards offer flexibility in subject choices, especially in regional languages and humanities. But many states are now following the NCERT curriculum keeping in mind the benefit of the students writing all India competitive exams.\n\nState boards generally have a relatively simpler syllabus compared to CBSE and ICSE, making them less stressful for students. However, since the syllabus is not standardized across states, students transferring between different state boards may face challenges. Competitive exam preparation may require additional coaching, as state board syllabi are not always aligned with national entrance tests. It is a good choice for students who prefer regional learning and wish to focus on state government job exams or local university admissions.",
      "IB (International Baccalaureate)": "The International Baccalaureate (IB) is a globally recognized board that focuses on inquiry-based, interdisciplinary learning. It is ideal for students who want to pursue higher education abroad, as its curriculum is accepted by top universities worldwide. IB follows a holistic approach to education, emphasizing creativity, critical thinking, and research skills. Students are encouraged to work on projects, independent research, and real-world problem-solving.\n\nIB offers three levels of education: Primary Years Programme (PYP), Middle Years Programme (MYP), and Diploma Programme (DP). The Diploma Programme, for Grades 11 and 12, is particularly rigorous, requiring students to take six subjects and complete an extended essay, Theory of Knowledge (TOK) course, and Creativity, Activity, and Service (CAS) projects. While IB is an excellent choice for all-round development, it can be expensive and academically demanding, requiring strong self-discipline and time management skills.",
      "IGCSE (International General Certificate of Secondary Education)": "IGCSE, offered by Cambridge, is an internationally recognized board known for its flexible and diverse subject choices. It allows students to choose from over 70 subjects, making it highly customizable based on individual interests. The curriculum is application-based, with a strong emphasis on conceptual understanding rather than rote memorization. IGCSE provides a good foundation for students planning to pursue the IB Diploma Programme or A-Levels.\n\nAssessments in IGCSE are based on coursework, projects, and written exams, making it a student-friendly board. Unlike CBSE and ICSE, it does not follow a rigid syllabus structure, allowing students to focus on subjects they enjoy. It is a great choice for students aiming for international universities, as it aligns with global education standards. However, it can be expensive, and students must be prepared for independent learning and critical thinking.",
      "NIOS (National Institute of Open Schooling)": "NIOS is an open schooling system designed for students who require flexibility in their education. It is ideal for students who may not be able to attend regular school due to personal, professional, or health-related reasons. NIOS allows students to learn at their own pace and choose subjects based on their interests. The board is particularly beneficial for athletes, artists, and students who need a non-traditional learning approach.\n\nOne of the major advantages of NIOS is that students can appear for exams at their convenience, giving them the freedom to balance academics with other commitments. The board offers vocational courses, skill-based programs, and traditional academic subjects, making it diverse and inclusive. While NIOS certificates are recognized for higher education and government jobs, students may need extra effort for competitive exam preparation, as the structured classroom environment is absent."
    }
  }
}

export { testMetaData, testStaticContent };