import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { estLogo, youcodeLogo } from "../assets";
import CanvasCursor from "./CanvasCursor";

const EducationItem = ({ schoolLogo, schoolName, degree, year, description, skills, index }) => {
  const cardId = `education-card-${index}`;
  
  return (
    <motion.div
      id={cardId}
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className='group bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-8 hover:bg-opacity-70 transition-all duration-300 relative'
    >
      <CanvasCursor containerId={cardId} />
      <div className='flex items-center gap-6 mb-6'>
        {schoolLogo && (
          <div className='w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl p-3 flex-shrink-0'>
            <img src={schoolLogo} alt={`${schoolName} logo`} className='w-full h-full object-contain' />
          </div>
        )}
        <div className='flex-1'>
          <h3 className='font-bold text-white text-xl sm:text-2xl lg:text-3xl leading-tight text-left'>{schoolName}</h3>
          <p className='text-white font-semibold text-lg sm:text-xl mt-1 text-left'>{degree}</p>
          <p className='text-gray-400 text-sm sm:text-base mt-1 text-left'>{year}</p>
        </div>
      </div>

      <p className='text-gray-300 leading-relaxed mb-6 text-sm sm:text-base lg:text-lg text-left'>{description}</p>

      {skills && skills.length > 0 && (
        <div className='text-left'>
          <p className='text-white font-semibold mb-3 text-sm sm:text-base text-left'>Skills:</p>
          <div className='flex flex-wrap gap-2'>
            {skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className='px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-600 hover:border-orange-500 hover:text-orange-400 transition-colors duration-200'
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Education = () => {
  const educationData = [
    {
      schoolLogo: youcodeLogo,
      schoolName: 'YouCode',
      degree: 'Full Stack Developer',
      year: '2024 - Present',
      description: 'Currently enhancing full-stack development skills through hands-on projects involving front-end and back-end technologies. Collaborating on innovative solutions for web applications and gaining experience with scalable system designs.',
      skills: [
        'C',
        'HTML5',
        'CSS3',
        'Figma',
        'Tailwind CSS',
        'JavaScript',
        'MySQL',
        'PHP',
        'PostgreSQL',
        'SQLite',
        'Laravel',
        'MongoDB',
        'Express.js',
        'React',
        'Node.js',
        'Vue.js'
      ]
    },
    {
      schoolLogo: estLogo,
      schoolName: 'EST - École Supérieure de Technologie',
      degree: 'Banking and Insurance Management',
      year: '2023 - 2024',
      description: 'Studied banking and insurance management, gaining comprehensive knowledge in accounting, finance, marketing, and business management principles.',
      skills: [
        'Accounting',
        'Finance',
        'Marketing',
        'Banking',
        'Insurance',
        'Business Management'
      ]
    }
  ];

  return (
    <>
      {/* Education Section */}
      <div className='text-center mb-10 relative'>
        <motion.div variants={textVariant()}>
          <h2 className={`${styles.sectionText} text-center mb-4`}>
            My Education
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className='mt-10 md:mt-20 w-full max-w-screen-2xl mx-auto px-4'
        >
          {educationData.map((education, index) => (
            <EducationItem
              key={`education-${index}`}
              {...education}
              index={index}
            />
          ))}
        </motion.div>
      </div>  
    </>
  );
};

export default SectionWrapper(Education, "education");
