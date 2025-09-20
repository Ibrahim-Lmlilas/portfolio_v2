import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { FaJs, FaCss3, FaHtml5, FaReact, FaLaravel, FaPhp, FaGit, FaVuejs, FaFigma, FaNode, FaDocker } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiC, SiMongodb, SiExpress, SiMysql, SiPostgresql, SiSqlite } from "react-icons/si";


const skills = [
    { icon: SiC, name: 'C' },
    { icon: FaGit, name: 'Git' },
    { icon: FaHtml5, name: 'HTML5' },
    { icon: FaCss3, name: 'CSS3' },
    { icon: FaFigma, name: 'Figma' },
    { icon: RiTailwindCssFill, name: 'Tailwind CSS' },
    { icon: FaJs, name: 'JavaScript' },
    { icon: SiMysql, name: 'MySQL' },
    { icon: FaPhp, name: 'PHP' },
    { icon: SiPostgresql, name: 'PostgreSQL' },
    { icon: SiSqlite, name: 'SQLite' },
    { icon: FaLaravel, name: 'Laravel' },
    { icon: FaDocker, name: 'Docker' },
    // MERN Stack
    { icon: SiMongodb, name: 'MongoDB' },
    { icon: SiExpress, name: 'Express.js' },
    { icon: FaReact, name: 'React' },
    { icon: FaNode, name: 'Node.js' },
    { icon: FaVuejs, name: 'Vue.js' }
];

function Skill({icon: Icon, name, index}) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className='skill-card py-10 px-6 rounded-xl border-2 border-gray-700 bg-gray-800 bg-opacity-50 backdrop-blur-sm text-white hover:border-pink-600 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105'
        >
            <Icon size={60} className='mx-auto text-cyan-400 mb-6'/>
            <p className='text-center font-bold text-xl'>{name}</p>
        </motion.div>
    )
}

const Skills = () => {
    return (
        <div className='text-center'>
            <motion.div variants={textVariant()}>
                <h2 className={`${styles.sectionText} text-center mb-4`}>
                    My Skills
                </h2>
                
            </motion.div>

            <motion.div 
                className='mt-10 md:mt-20 w-full max-w-screen-2xl mx-auto px-4 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-12'
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {skills.map((skill, index) => (
                    <Skill key={index} icon={skill.icon} name={skill.name} index={index} />
                ))}
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Skills, "skills");
