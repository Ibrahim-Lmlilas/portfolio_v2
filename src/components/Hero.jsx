import { SpacemanCanvas } from ".";
import Position from "./Position";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Hero = ({ scrollContainer }) => {
  return (
    <section className="parallax bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/Stylized Galaxy Background.jpg')"}}>
      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      
      {/* Social Icons - Top Left */}
      <div className="absolute top-4 left-16 z-20 flex gap-4">
        <a 
          href="https://github.com/Ibrahim-Lmlilas" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-pink-600"
        >
          <FaGithub size={28} />
        </a>
        <a 
          href="https://www.linkedin.com/in/ibrahim-lmlilas-346102334/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-pink-600"
        >
          <FaLinkedin size={28} />
        </a>
      </div>
      
      <div className='parallax__content absolute top-[10%] sm:top-[16%] lg:top-[24%] w-full mx-auto lg:pl-[38vh] lg:pr-[30vh] xl:pl-96 xl:pr-72 2xl:px-40 3xl:px-60 flex flex-col lg:flex-row items-start z-10'>
        <div className="flex-1 lg:mb-0">
          <h1 className='font-medium text-white text-[30px] xs:text-[35px] sm:text-[48px] md:text-[60px] lg:text-[70px] 2xl:text-[120px] leading-[80px] 2xl:leading-[120px]'>
            LMLILAS IBRAHIM
          </h1>
          <Position />
        </div>
        <div className="flex-1 flex justify-start lg:justify-end mt-4 sm:mt-14 ml-8 xs:ml-[-4vh] sm:ml-[-17vh] md:ml-[-26vh] lg:mt-10 2xl:mt-0">
          <div className='font-bold text-[16px] sm:text-[22px] md:text-[26px] 2xl:text-[32px] sm:leading-[30px] md:leading-[36px] 2xl:leading-[42px] streaky-glow max-w-sm 2xl:max-w-lg text-white text-left'>
            Passionate full stack developer exploring latest web development trends and best practices.
          </div>  
        </div>
      </div>

      <img className="parallax__mountain1" src="./parallax/3Mountain.svg" alt="" />
      <img className="parallax__mountain2" src="./parallax/4Mountain.svg" alt="" />
      <img className="parallax__crater" src="./parallax/5Crater.svg" alt="" />

      <SpacemanCanvas scrollContainer={scrollContainer} />
    </section>
  );
};

export default Hero;
