import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const Experience = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance Projects',
      location: 'Remote',
      period: '2025 - Present',
      description: 'Developing modern web applications using React, Next.js, and Node.js. Creating responsive designs and implementing complex user interfaces with smooth animations.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      achievements: [
        'Built 10+ responsive web applications',
        'Implemented complex animations with Framer Motion',
        'Integrated modern authentication systems',
        'Optimized applications for 90+ performance scores'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'University Projects',
      location: 'RUET, Rajshahi',
      period: '2024 - present',
      description: 'Led development of various academic projects focusing on modern web technologies and user experience design.',
      technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Git'],
      achievements: [
        'Developed interactive web applications',
        'Collaborated with team members on complex projects',
        'Implemented responsive design principles',
        'Created reusable component libraries'
      ]
    },
    {
      title: 'Web Development Intern',
      company: 'Local Tech Startup',
      location: 'Rajshahi, Bangladesh',
      period: '2024',
      description: 'Gained hands-on experience in web development, working on real-world projects and learning industry best practices.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP'],
      achievements: [
        'Contributed to 3 client projects',
        'Learned version control with Git',
        'Improved website loading speeds by 40%',
        'Gained experience in client communication'
      ]
    }
  ];

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };

  return (
    <section id="experience" className="py-20 bg-gray-800/50 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
            variants={itemVariants}
          >
            Experience
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            My journey in web development and the projects I've worked on
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400 hidden md:block"></div>

          <motion.div 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="relative"
                variants={itemVariants}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900 hidden md:block"></div>
                
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <motion.div 
                    className="md:ml-20 bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {exp.title}
                        </h3>
                        <div className="flex items-center text-blue-400 mb-2">
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end text-sm text-gray-400">
                        <div className="flex items-center mb-1">
                          <Calendar size={14} className="mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside text-gray-400 space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* External Link */}
                    <motion.div 
                      className="mt-4 text-blue-400 hover:text-purple-400 transition-all duration-300"
                      variants={itemVariants}
                    >
                      <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Visit My GitHub</span>
                      </a>
                    </motion.div>
                  </motion.div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;