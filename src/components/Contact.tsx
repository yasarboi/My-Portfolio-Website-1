import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, MessageCircle, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const Contact = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'yasarshasso2@gmail.com',
      link: 'mailto:yasarshasso2@gmail.com',
      color: 'text-green-400'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+8801714118754',
      link: 'tel:+8801714118754',
      color: 'text-blue-400'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Rajshahi, Bangladesh',
      link: null,
      color: 'text-purple-400'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      name: 'GitHub',
      url: 'https://github.com/yasarboi',
      color: 'hover:text-gray-400',
      bgColor: 'hover:bg-gray-400/10'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: 'LinkedIn',
      url: 'http://linkedin.com/in/samin-yasar-shasso-40a10a21b',
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-400/10'
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      name: 'Facebook',
      url: 'https://www.facebook.com/yasar.shasso',
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-400/10'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      name: 'Whatsapp',
      url: 'http://wa.me/8801714118754',
      color: 'hover:text-purple-400',
      bgColor: 'hover:bg-purple-400/10'
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
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-5"
      >
        <source src="https://ik.imagekit.io/cys7fe7bp/6068178-uhd_3840_2160_30fps.mp4?updatedAt=1755968200419" type="video/mp4" />
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
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Let's collaborate and create something amazing together!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Let's start a conversation
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                I'm always excited to discuss new opportunities, innovative projects, or just have 
                a friendly chat about technology. Whether you're looking for a developer, have a 
                project idea, or want to collaborate, I'd love to hear from you!
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              {contactInfo.map((info, index) => (
                <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <motion.div 
                    className="flex items-center space-x-4 p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <div className={`${info.color}`}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{info.title}</h4>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className={`${info.color} hover:text-white transition-colors duration-200`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-gray-400">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-white font-medium mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-gray-400 ${social.color} ${social.bgColor} transition-all duration-200`}
                    aria-label={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default Contact;