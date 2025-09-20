import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

const Contact = () => {
  const formRef = useRef();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult("Sending....");
    
    const formData = new FormData(event.target);
    formData.append("access_key", "595a6640-e288-4358-a8c7-2e53dc9edadd");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      setLoading(false);
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="md:m-12 md:px-48 flex flex-col sm:flex-row gap-10  overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
          },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              type: "tween",
              duration: 1,
              delay: 0.2,
            },
          },
        }}
        className='flex-[0.8] md:pb-40 mx-4 sm:mx-auto'
      >
        <h3 className={styles.sectionText}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="mt-12 gap-4 flex flex-col"
        >
          <span className='text-white font-medium mt-3'>Full Name</span>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="bg-tertiary p-4 text-white border border-gray-600 font-medium rounded-lg transition-all duration-300 focus:outline-none"
            required
            onFocus={(e) => {
              e.target.style.background = 'linear-gradient(rgb(29, 24, 54), rgb(29, 24, 54)) padding-box, linear-gradient(45deg, #ff6b35, #f7931e, #00d9ff, #ff1493, #ff6b35) border-box';
              e.target.style.border = '2px solid transparent';
              e.target.style.backgroundSize = '400% 400%';
              e.target.style.animation = 'gradientMove 3s ease infinite';
            }}
            onBlur={(e) => {
              e.target.style.background = 'rgb(29, 24, 54)';
              e.target.style.border = '1px solid rgb(75, 85, 99)';
              e.target.style.animation = 'none';
            }}
          />
          <span className='text-white font-medium mt-3'>Email Address</span>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="bg-tertiary p-4 text-white border border-gray-600 font-medium rounded-lg transition-all duration-300 focus:outline-none"
            required
            onFocus={(e) => {
              e.target.style.background = 'linear-gradient(rgb(29, 24, 54), rgb(29, 24, 54)) padding-box, linear-gradient(45deg, #ff6b35, #f7931e, #00d9ff, #ff1493, #ff6b35) border-box';
              e.target.style.border = '2px solid transparent';
              e.target.style.backgroundSize = '400% 400%';
              e.target.style.animation = 'gradientMove 3s ease infinite';
            }}
            onBlur={(e) => {
              e.target.style.background = 'rgb(29, 24, 54)';
              e.target.style.border = '1px solid rgb(75, 85, 99)';
              e.target.style.animation = 'none';
            }}
          />
          <span className='text-white font-medium mt-3'>Message</span>
          <textarea
            name="message"
            placeholder="Enter your message"
            rows="10"
            className="bg-tertiary p-4 text-white border border-gray-600 font-medium rounded-lg transition-all duration-300 focus:outline-none resize-none"
            required
            onFocus={(e) => {
              e.target.style.background = 'linear-gradient(rgb(29, 24, 54), rgb(29, 24, 54)) padding-box, linear-gradient(45deg, #ff6b35, #f7931e, #00d9ff, #ff1493, #ff6b35) border-box';
              e.target.style.border = '2px solid transparent';
              e.target.style.backgroundSize = '400% 400%';
              e.target.style.animation = 'gradientMove 3s ease infinite';
            }}
            onBlur={(e) => {
              e.target.style.background = 'rgb(29, 24, 54)';
              e.target.style.border = '1px solid rgb(75, 85, 99)';
              e.target.style.animation = 'none';
            }}
          />
          <button
            type='submit'
            className='bg-orange-500 py-3 px-8 w-fit text-white font-bold shadow-md shadow-primary hover:bg-orange-600 transition-all duration-300 border-2 border-black rounded-lg'
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
          {result && (
            <span className='text-white mt-2'>{result}</span>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");