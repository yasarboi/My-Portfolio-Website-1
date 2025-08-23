import { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const roles = useMemo(
    () => [
      'Full Stack Developer',
      'React Specialist',
      'Next.js Expert',
      'Three.js Enthusiast',
      'Problem Solver',
    ],
    []
  );

  useEffect(() => {
    let currentText = '';
    let isDeleting = false;
    let loopNum = 0;
    let timeoutId: number;

    const TYPE_DELAY = 60;
    const DELETE_DELAY = 35;
    const WORD_PAUSE = 600;
    const LOOP_PAUSE = 250;

    const type = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        setDisplayText(currentText);

        if (currentText === '') {
          isDeleting = false;
          loopNum++;
          timeoutId = window.setTimeout(type, LOOP_PAUSE);
        } else {
          timeoutId = window.setTimeout(type, DELETE_DELAY);
        }
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        setDisplayText(currentText);

        if (currentText === fullText) {
          isDeleting = true;
          timeoutId = window.setTimeout(type, WORD_PAUSE);
        } else {
          timeoutId = window.setTimeout(type, TYPE_DELAY);
        }
      }
    };

    type();
    return () => window.clearTimeout(timeoutId);
  }, [roles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      radius: number;
      vx: number;
      vy: number;
      vz: number;
      opacity: number;
      color: string;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 1000,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: ['#1e40af', '#1e3a8a', '#312e81', '#1e40af'][Math.floor(Math.random() * 4)]
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const gradient = ctx.createRadialGradient(
        canvas.offsetWidth / 2, canvas.offsetHeight / 2, 0,
        canvas.offsetWidth / 2, canvas.offsetHeight / 2, Math.max(canvas.offsetWidth, canvas.offsetHeight) / 2
      );
      gradient.addColorStop(0, 'rgba(30, 64, 175, 0.05)');
      gradient.addColorStop(1, 'rgba(30, 58, 138, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle, index) => {

        particle.x += particle.vx + Math.sin(time + index) * 0.5;
        particle.y += particle.vy + Math.cos(time + index) * 0.5;
        particle.z += particle.vz;

        if (particle.z > 1000) {
          particle.z = 0;
          particle.x = Math.random() * canvas.offsetWidth;
          particle.y = Math.random() * canvas.offsetHeight;
        }

        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        const scale = (1000 - particle.z) / 1000;
        const projectedRadius = particle.radius * scale;
        const alpha = particle.opacity * scale;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, projectedRadius, 0, Math.PI * 2);

        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, projectedRadius * 3
        );
        glow.addColorStop(0, particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
        glow.addColorStop(1, particle.color + '00');
        
        ctx.fillStyle = glow;
        ctx.fill();

        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const dz = particle.z - otherParticle.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz * 0.1);

            if (distance < 120) {
              const connectionAlpha = (1 - distance / 120) * 0.3 * scale * (1000 - otherParticle.z) / 1000;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(30, 64, 175, ${connectionAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-navy-900 to-indigo-900" style={{backgroundColor: '#0f172a'}}>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-800/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-navy-800/10 to-slate-800/10 rounded-full blur-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating 3D-style sphere using CSS */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 flex items-center justify-center">
        <motion.div
          className="relative w-64 h-64"
          animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-800/30 to-indigo-900/30 backdrop-blur-sm border border-blue-800/20"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(30, 64, 175, 0.4), rgba(30, 58, 138, 0.2), rgba(49, 46, 129, 0.1))',
              boxShadow: '0 0 60px rgba(30, 64, 175, 0.3), inset 0 0 60px rgba(30, 58, 138, 0.2)'
            }}
          />
          <motion.div 
            className="absolute inset-4 rounded-full bg-gradient-to-tr from-slate-400/20 to-transparent"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { delayChildren: 0.3, staggerChildren: 0.2 },
          },
        }}
      >
      <div>
        <br />
        <br />
        <br />
      </div>
        <div className="space-y-8">

          {/* Profile Section */}
          <motion.div className="space-y-1" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <motion.div className="relative inline-block" whileHover={{ scale: 1.05 }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-800/50 to-indigo-800/50 blur-xl animate-pulse" />
              <img
                src="https://ik.imagekit.io/cys7fe7bp/IMG_4052.jpg?updatedAt=1755942588841"
                alt="Samin Yasar Shasso"
                className="relative w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-800/50 shadow-2xl"
              />
            </motion.div>

            <motion.h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl">
              <span className="block text-white mb-2">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-blue-300 via-slate-300 to-purple-200 bg-clip-text text-transparent">
                Samin Yasar Shasso
              </span>
            </motion.h1>

            <motion.div
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 h-16 flex items-center justify-center"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              <span className="font-light">
                {displayText}
                <motion.span
                  className="text-blue-300"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  |
                </motion.span>
              </span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center space-x-2 text-gray-400"
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          >
            <MapPin size={20} />
            <span>Rajshahi, Bangladesh</span>
          </motion.div>

          <motion.p
            className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
          >
            Passionate Computer Science student at RUET, specializing in modern web technologies
            and creating innovative digital solutions that make a difference.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          >
            <motion.button
              onClick={() => scrollToSection('#projects')}
              className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(30, 64, 175, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('#contact')}
              className="border-2 border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-navy-900 font-semibold py-4 px-8 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Media Links */}
          <motion.div 
            className="flex items-center justify-center space-x-6 pt-8"
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          >
            <motion.a
              href="https://github.com/yasarboi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={28} />
            </motion.a>
            <motion.a
              href="http://linkedin.com/in/samin-yasar-shasso-40a10a21b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-300 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={28} />
            </motion.a>
            <motion.a
              href="mailto:yasarshasso2@gmail.com"
              className="text-gray-400 hover:text-slate-300 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={28} />
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.button
          onClick={() => scrollToSection('#about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors duration-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;