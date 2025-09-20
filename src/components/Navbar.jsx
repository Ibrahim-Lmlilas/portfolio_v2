import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { close, menu } from "../assets";
import { navLinks } from "../data";

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("div[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50% 0px'
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <nav
      className={`w-full flex items-center bg-gradient-to-b from-black sm:bg-none p-8 sm:px-16 sm:py-10 fixed z-40 pointer-events-none transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-black bg-opacity-80 backdrop-blur-sm' : ''
      }`}
    >
      <div className='w-full flex justify-between items-start mx-auto'>
        <Link
          to='/'
          className='flex items-start'
          onClick={() => {
            setActive("hero");
            window.scrollTo(0, 0);
            }}
            >
             
            </Link>

            <ul className='list-none hidden sm:flex flex-col gap-5'>
              {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`relative flex items-center ${
                active === nav.id ? "text-white" : "text-black"
                } hover:text-gray-300 text-[14px] lg:text-[18px] font-bold pointer-events-auto cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105`}
                onClick={() => setActive(nav.id)}
              >
                <a href={`#${nav.id}`} className="transition-colors duration-300">{nav.title}</a>
                {active === nav.id && (
                <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-2 h-6 lg:h-8 bg-orange-500 animate-pulse"></div>
                )}
              </li>
              ))}
            </ul>

            <div className='sm:hidden flex flex-1 justify-end items-center'>
              <img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain pointer-events-auto cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95'
              onClick={() => setToggle(!toggle)}
              />

              <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-30 rounded-xl bg-black bg-opacity-90 backdrop-blur-sm border border-gray-700 transition-all duration-300 ease-in-out transform ${
                toggle ? 'animate-fade-in-down' : ''
              }`}
              style={{
                animation: toggle ? 'fadeInDown 0.3s ease-in-out' : 'none'
              }}
              >
              <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[14px] ${
                  active === nav.id ? "text-white" : "text-gray-300"
                  } hover:text-white transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:scale-105`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.id);
                  }}
                >
                  <a href={`#${nav.id}`} className="transition-colors duration-300">{nav.title}</a>
                </li>
                ))}
              </ul>
              </div>
            </div>
      </div>
    </nav>
  );
};

export default Navbar;
