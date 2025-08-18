import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const useInViewWithThreshold = (threshold: number = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: threshold,
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
  }, [threshold]);

  return { ref, isInView };
};

const Education = () => {
  const { ref, isInView } = useInViewWithThreshold(0.1);

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science and Engineering',
      institution: 'Rajshahi University of Engineering and Technology (RUET)',
      location: 'Rajshahi, Bangladesh',
      period: '2023 - Present',
      description: 'Pursuing comprehensive education in computer science with focus on software engineering, algorithms, data structures, and modern web technologies.',
      gpa: '3.56/4.00',
      achievements: [
        'Dean\'s List for academic excellence',
        'Active member of Programming Club',
        'Participated in multiple hackathons',
        'Led several group projects'
      ],
      courses: [
        'Data Structures & Algorithms',
        'Software Engineering',
        'Database Management Systems',
        'Computer Networks',
        'Web Technologies',
        'Machine Learning'
      ]
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Michael Madhusudan College',
      location: 'Jashore, Bangladesh',
      period: '2020 - 2022',
      description: 'Completed higher secondary education with focus on Science group, building strong foundation in mathematics and physics.',
      gpa: '5.00/5.00',
      achievements: [
        'Golden GPA 5.00',
        'Merit scholarship recipient',
        'Science club member',
        'Mathematics olympiad participant'
      ],
      courses: [
        'Higher Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'ICT',
        'English'
      ]
    }
  ];

  const certifications = [
    {
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: '2025',
      icon: '⚛️'
    },
    {
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: '2025',
      icon: '🌐'
    },
    {
      title: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: '2025',
      icon: '📊'
    },
    {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: '2025',
      icon: '📱'
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
    <section id="education" className="py-20 bg-gray-800/50 relative overflow-hidden">
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
            Education & Certifications
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            My academic journey and continuous learning path
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              className="text-2xl font-semibold text-white mb-8 flex items-center"
              variants={itemVariants}
            >
              <GraduationCap className="mr-3 text-blue-400" size={28} />
              Education
            </motion.h3>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <motion.div 
                    className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {edu.degree}
                        </h4>
                        <div className="text-blue-400 font-medium mb-1">
                          {edu.institution}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <MapPin size={14} className="mr-1" />
                          {edu.location}
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end text-sm text-gray-400">
                        <div className="flex items-center mb-1">
                          <Calendar size={14} className="mr-1" />
                          {edu.period}
                        </div>
                        <div className="text-green-400 font-semibold">
                          GPA: {edu.gpa}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {edu.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-white font-medium mb-2 flex items-center">
                          <Award size={16} className="mr-2 text-yellow-400" />
                          Achievements
                        </h5>
                        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2 flex items-center">
                          <BookOpen size={16} className="mr-2 text-green-400" />
                          Key Courses
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {edu.courses.map((course, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              className="text-2xl font-semibold text-white mb-8 flex items-center"
              variants={itemVariants}
            >
              <Award className="mr-3 text-purple-400" size={28} />
              Certifications
            </motion.h3>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <motion.div 
                    className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{cert.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{cert.title}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-400 text-sm">{cert.issuer}</span>
                          <span className="text-gray-400 text-sm">{cert.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </div>

            {/* Additional Learning */}
            <motion.div 
              className="mt-8 bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
              variants={itemVariants}
            >
              <h4 className="text-white font-semibold mb-4">Continuous Learning</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                I believe in lifelong learning and staying updated with the latest technologies. 
                Currently exploring advanced React patterns, serverless architectures, and AI integration in web applications.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Next.js 14', 'TypeScript', 'Three.js', 'AI/ML', 'Web3', 'Cloud Computing'].map((topic, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;