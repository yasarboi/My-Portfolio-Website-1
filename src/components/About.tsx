import { useRef } from 'react';
import { Code, Coffee, Heart, Zap, GraduationCap, MapPin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code following industry best practices'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Performance',
      description: 'Optimizing applications for lightning-fast user experiences'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'User-Centered',
      description: 'Creating intuitive interfaces that users love to interact with'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and improving my skills'
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Fueling creativity and building new ideas through constant exploration'
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

  return (
    <section id="about" className="py-20 bg-gray-800/50 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      >
        <source src="https://streamable.com/jztm90" type="video/mp4" />
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
            About Me
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A passionate Computer Science student crafting digital experiences that matter
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className="relative" variants={itemVariants}>
              <motion.img
                src="https://ik.imagekit.io/cys7fe7bp/department-of-architecture9hQN2P9q97.jpg?updatedAt=1755455340753=800"
                alt="Coding workspace"
                className="rounded-xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div className="flex items-center space-x-4 text-gray-300" variants={itemVariants}>
              <MapPin className="text-blue-400" size={20} />
              <span>Rajshahi University of Engineering and Technology</span>
            </motion.div>

            <motion.div className="prose prose-lg text-gray-300 space-y-4" variants={itemVariants}>
              <p className="leading-relaxed">
                I'm currently pursuing my Computer Science and Engineering degree at RUET, where I've developed 
                a deep passion for modern web technologies. My journey in programming started 
                with curiosity about how digital products work, and has evolved into expertise 
                in React, Next.js, and cutting-edge development tools.
              </p>
              <p className="leading-relaxed">
                I specialize in creating full-stack applications using React, Next.js, TypeScript, 
                and modern databases. My experience includes working with Three.js for 3D web 
                experiences, Framer Motion for smooth animations, and various backend technologies 
                to build complete digital solutions.
              </p>
              <p className="leading-relaxed">
                When I'm not coding, I'm exploring new technologies, contributing to open source 
                projects, or sharing knowledge with fellow developers. I believe in continuous 
                learning and staying updated with the latest industry trends.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {highlights.map((highlight, index) => (
              <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group h-full"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="text-blue-400 mb-3 group-hover:text-purple-400 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {highlight.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              </Tilt>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;