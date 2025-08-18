
import { Heart, Code, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Samin Yasar Shasso
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Computer Science student at RUET, passionate about creating innovative web solutions 
              and exploring cutting-edge technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-white font-semibold">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#skills', label: 'Skills' },
                { href: '#experience', label: 'Experience' },
                { href: '#projects', label: 'Projects' },
                { href: '#education', label: 'Education' },
                { href: '#contact', label: 'Contact' }
              ].map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => {
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm text-left"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-white font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-sm">
              <a 
                href="mailto:yasarshasso2@gmail.com"
                className="block text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                yasarshasso2@gmail.com
              </a>
              <a 
                href="tel:+8801714118754"
                className="block text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                +880 1714 118754
              </a>
              <span className="block text-gray-400">
                Rajshahi, Bangladesh
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-red-400" />
            </motion.div>
            <span>and</span>
            <Code size={16} className="text-blue-400" />
            <span>by Samin Yasar Shasso</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              © {currentYear} All rights reserved.
            </span>
            <motion.button
              onClick={scrollToTop}
              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-full transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;