import React from 'react';
import { BiSolidBrain } from "react-icons/bi";
import { FaBookReader, FaLightbulb, FaRocket, FaStethoscope, FaTheaterMasks } from "react-icons/fa";
import { GiPaintBrush } from "react-icons/gi";
import { IoEar, IoRocket } from "react-icons/io5";
import { MdEngineering, MdOutlineEmojiEmotions, MdOutlineTimer, MdWork } from "react-icons/md";
import { PiBarbellFill, PiCertificateFill } from "react-icons/pi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { TbAbc } from "react-icons/tb";

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
  }
}



export { testMetaData,testStaticContent };