import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { createPortal } from "react-dom";

import { portfolio } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { classicGames, classicGames2, classicGames3, quiz1, quiz2, quiz3, quiz4, quiz5, quiz6, jobDating1, jobDating2, jobDating3, jobDating4, jobDating5 } from "../assets";

const ProjectCard = ({
  index,
  name,
  description,
  image,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const cardRef = React.useRef(null);

  const isClassicGames = name === "Classic Games Website";
  const isQuiz = name === "Quiz";
  const isJobDating = name === "Job Dating Platform";
  const gameImages = [classicGames, classicGames2, classicGames3];
  const quizImages = [quiz1, quiz2, quiz3, quiz4, quiz5, quiz6];
  const jobDatingImages = [jobDating1, jobDating2, jobDating3, jobDating4, jobDating5];

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const isEven = index % 2 === 0;

  const nextImage = () => {
    const images = isClassicGames ? gameImages : isQuiz ? quizImages : jobDatingImages;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = isClassicGames ? gameImages : isQuiz ? quizImages : jobDatingImages;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <motion.div
        ref={(el) => {
          ref(el);
          cardRef.current = el;
        }}
        animate={controls}
        initial="hidden"
        variants={fadeIn("up", "spring", 0, 0.75)}
        className={`w-full mt-[-2px] flex flex-col md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-5`}
      >
        <div className='relative w-full md:w-3/5 group'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-auto object-cover md:rounded-3xl'
          />
          {(isClassicGames || isQuiz || isJobDating) && (
            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center md:rounded-3xl'>
              <button
                onClick={() => {
                  setCurrentImageIndex(0); // Reset to first image when opening modal
                  setIsModalOpen(true);
                }}
                className='bg-orange-500 border-4 border-black text-black p-4 rounded-full font-bold text-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 hover:bg-orange-600'
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path 
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="3" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className={`w-full md:w-2/5 px-6 md:p-16 flex flex-col justify-center ${isEven ? "text-left md:text-left" : "text-left md:text-right"}`}>
          <h3 className='text-white font-medium text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-tight'>{name}</h3>
          <p className='mt-4 text-secondary text-sm sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl'>{description}</p>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (isClassicGames || isQuiz || isJobDating) && createPortal(
        <div 
          className='fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center'
          onClick={() => setIsModalOpen(false)}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            animation: 'modalBackdropAppear 0.3s ease-out forwards'
          }}
        >
          <div 
            className='bg-gray-900 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-auto relative'
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'modalAppear 0.3s ease-out forwards'
            }}
          >
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center gap-3'>
                <a
                  href={isClassicGames ? "https://ibrahim-lmlilas.github.io/Play/index.html" : isQuiz ? "https://ibrahim-lmlilas.github.io/Quiz-statique-/" : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-orange-500 hover:text-orange-400 transition-colors font-bold ${isJobDating ? 'pointer-events-none opacity-50' : ''}`}
                  title={isJobDating ? "GitHub Repository" : "Visit Live Website"}
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 font-bold"
                    strokeWidth="3"
                  >
                    <path 
                      d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M15 3H21V9" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M10 14L21 3" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <h3 className='text-white text-2xl font-bold hidden md:block'>{isClassicGames ? "Classic Games Website" : isQuiz ? "Interactive Quiz" : "Job Dating Platform"}</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-white text-3xl hover:text-gray-300 transition-colors font-bold'
              >
                ×
              </button>
            </div>
            
            <div className='relative mb-6'>
              <img
                src={isClassicGames ? gameImages[currentImageIndex] : isQuiz ? quizImages[currentImageIndex] : jobDatingImages[currentImageIndex]}
                alt={`${isClassicGames ? "Game" : isQuiz ? "Quiz" : "Job Dating"} screenshot ${currentImageIndex + 1}`}
                className='w-full h-[400px] object-contain rounded-lg '
              />
              
              {((isClassicGames && gameImages.length > 1) || (isQuiz && quizImages.length > 1) || (isJobDating && jobDatingImages.length > 1)) && (
                <>
                  <button
                    onClick={prevImage}
                    className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-14 h-14 rounded-full hover:bg-opacity-70 transition-all flex items-center justify-center text-2xl font-bold'
                  >
                    ‹
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-14 h-14 rounded-full hover:bg-opacity-70 transition-all flex items-center justify-center text-2xl font-bold'
                  >
                    ›
                  </button>
                  
                  <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                    {(isClassicGames ? gameImages : isQuiz ? quizImages : jobDatingImages).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const Portfolio = () => {
  return (
    <div className='text-center'>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionText} text-center mb-4`}>Projects</h2>
      </motion.div>

      <div className='mt-10 md:mt-20 w-full max-w-screen-2xl mx-auto px-4 flex flex-col gap-10 md:gap-20'>
        {portfolio.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* Additional Client Work Text */}
      <motion.div 
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className='mt-16 md:mt-24 w-full max-w-4xl mx-auto px-4'
      >
        <div className='bg-gray-900 bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700'>
          <h3 className='text-gray-100 text-xl md:text-2xl font-bold text-center mb-4'>Additional Client Projects</h3>
          <p className='text-gray-300 text-center leading-relaxed'>
            Beyond these featured projects, I've developed numerous custom Laravel applications for various clients, 
            including e-commerce platforms, business management systems, and API integrations. 
            Due to confidentiality agreements, specific details cannot be shared publicly.
         <br></br>
            If you have a project in mind and need help with backend or frontend development, feel free to{' '}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className='text-pink-400 hover:text-pink-600 transition-colors duration-300 font-semibold underline decoration-2 underline-offset-2'
            >
              contact me
            </button>
            {' '}and let's work together
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Portfolio, "portfolio");
