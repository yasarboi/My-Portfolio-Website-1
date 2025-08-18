import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const Skills = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
        { name: 'Next.js', level: 90, color: 'from-gray-400 to-gray-600' },
        { name: 'TypeScript', level: 88, color: 'from-blue-500 to-blue-700' },
        { name: 'Tailwind CSS', level: 92, color: 'from-cyan-400 to-cyan-600' },
        { name: 'Three.js', level: 75, color: 'from-green-400 to-green-600' },
        { name: 'Framer Motion', level: 85, color: 'from-purple-400 to-purple-600' }
      ]
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85, color: 'from-green-500 to-green-700' },
        { name: 'Express.js', level: 80, color: 'from-gray-500 to-gray-700' },
        { name: 'PostgreSQL', level: 75, color: 'from-blue-600 to-blue-800' },
        { name: 'Drizzle ORM', level: 70, color: 'from-orange-400 to-orange-600' },
        { name: 'Vercel', level: 88, color: 'from-black to-gray-800' },
        { name: 'Neon DB', level: 72, color: 'from-green-400 to-green-600' }
      ]
    },
    {
      title: 'Tools & Others',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90, color: 'from-red-400 to-red-600' },
        { name: 'Clerk Auth', level: 80, color: 'from-purple-500 to-purple-700' },
        { name: 'Figma', level: 78, color: 'from-pink-400 to-pink-600' },
        { name: 'Docker', level: 65, color: 'from-blue-500 to-blue-700' },
        { name: 'Jest', level: 75, color: 'from-red-500 to-red-700' },
        { name: 'Vite', level: 85, color: 'from-yellow-400 to-yellow-600' }
      ]
    }
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-5"
      >
        <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
      </video>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
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
            Skills & Expertise
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Technologies and tools I use to bring innovative ideas to life
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <Tilt key={categoryIndex} tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 h-full"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-2xl font-semibold text-white">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex} 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className={`bg-gradient-to-r ${skill.color} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: (categoryIndex * 0.2) + (skillIndex * 0.1),
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
