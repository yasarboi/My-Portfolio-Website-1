import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'services', 'experience', 'projects', 'testimonials', 'education', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    setIsVisible(true);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', icon: '🏠' },
    { href: '#about', label: 'About', icon: '👨‍💻' },
    { href: '#skills', label: 'Skills', icon: '⚡' },
    { href: '#experience', label: 'Experience', icon: '💼' },
    { href: '#projects', label: 'Projects', icon: '🚀' },
    { href: '#education', label: 'Education', icon: '🎓' },
    { href: '#contact', label: 'Contact', icon: '💬' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-2xl' 
          : 'bg-transparent'
      }`}
      style={{
        background: isScrolled ? 
          'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)' : 
          'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <h1
              className="text-lg font-bold bg-gradient-to-r from-blue-300 to-slate-300 bg-clip-text text-transparent cursor-pointer"
              onClick={() => scrollToSection('#home')}
            >
              S Y S
            </h1>
          </motion.div>

          {/* 3D Navigation Bar */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-2">
              {/* Main Navigation Pills */}
              <div 
                className="relative flex items-center space-x-1 bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-lg rounded-full p-2 border border-slate-600/30 shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4), rgba(51, 65, 85, 0.2))',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.2)'
                }}
              >
                {navItems.slice(0, 5).map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`relative px-3 py-2 text-xs font-medium rounded-full transition-all duration-300 flex items-center space-x-1 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        textShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                      }}
                    >
                      {/* Active background with 3D effect */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavBg"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'linear-gradient(145deg, #1e40af, #1e3a8a)',
                            boxShadow: '0 4px 16px rgba(30, 64, 175, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(145deg, rgba(30, 64, 175, 0.2), rgba(30, 58, 138, 0.1))',
                          boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                        }}
                      />
                      
                      <span className="relative z-10 text-lg opacity-70">{item.icon}</span>
                      <span className="relative z-10">{item.label}</span>
                      
                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-300 rounded-full shadow-lg"
                          style={{
                            boxShadow: '0 0 8px rgba(147, 197, 253, 0.8)'
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
                
                {/* Glass reflection effect */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)'
                  }}
                />
              </div>

              {/* Secondary Navigation Pills */}
              <div 
                className="relative flex items-center space-x-1 bg-gradient-to-r from-slate-800/40 to-slate-700/20 backdrop-blur-lg rounded-full p-2 border border-slate-600/20 shadow-xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.3), rgba(51, 65, 85, 0.15))',
                  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
                }}
              >
                {navItems.slice(5).map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`relative px-3 py-2 text-xs font-medium rounded-full transition-all duration-300 flex items-center space-x-1 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        textShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                      }}
                    >
                      {/* Active background */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavBg2"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'linear-gradient(145deg, #1e40af, #1e3a8a)',
                            boxShadow: '0 4px 16px rgba(30, 64, 175, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
                          }}
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      
                      <span className="relative z-10 text-base opacity-60">{item.icon}</span>
                      <span className="relative z-10">{item.label}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full"
                          style={{ boxShadow: '0 0 6px rgba(147, 197, 253, 0.8)' }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Medium Screen Navigation */}
          <nav className="hidden md:flex lg:hidden items-center justify-center flex-1 mx-4">
            <div 
              className="relative flex items-center space-x-1 bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-lg rounded-full p-1.5 border border-slate-600/30 shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4), rgba(51, 65, 85, 0.2))',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
              }}
            >
              {navItems.filter(item => ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'].includes(item.href.slice(1))).map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative p-2 text-xs font-medium rounded-full transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.1, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    title={item.label}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMdNavBg"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'linear-gradient(145deg, #1e40af, #1e3a8a)',
                          boxShadow: '0 4px 16px rgba(30, 64, 175, 0.4)'
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 text-lg">{item.icon}</span>
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-slate-300 hover:text-white transition-colors duration-200 bg-slate-800/50 rounded-full backdrop-blur-sm border border-slate-600/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
              }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Slide-In */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
                backdropFilter: 'blur(16px)', // You can adjust or remove this for testing
                borderTop: '1px solid rgba(71, 85, 105, 0.3)',
                zIndex: 60, // Ensure it is on top of other elements
              }}
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`relative w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-blue-800/80 to-indigo-800/80 shadow-lg'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      style={{
                        boxShadow: isActive
                          ? '0 4px 16px rgba(30, 64, 175, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                          : 'none',
                      }}
                    >
                      {isActive && (
                        <div
                          className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-300 rounded-full shadow-lg"
                          style={{ boxShadow: '0 0 8px rgba(147, 197, 253, 0.8)' }}
                        />
                      )}
                      <span className="text-lg opacity-70">{item.icon}</span>
                      <span className={isActive ? '' : ''}>{item.label}</span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-blue-300 rounded-full"
                          style={{ boxShadow: '0 0 6px rgba(147, 197, 253, 0.8)' }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
};

export default Header;