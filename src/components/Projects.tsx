import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const motion = {
  div: ({ children, variants, initial, animate, transition, whileHover, whileTap, style, className, onMouseMove, onMouseLeave, ...props }: any) => (
    <div className={className} style={style} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} {...props}>
      {children}
    </div>
  ),
  h2: ({ children, variants, initial, animate, transition, className, ...props }: any) => (
    <h2 className={className} {...props}>{children}</h2>
  ),
  p: ({ children, variants, initial, animate, transition, className, ...props }: any) => (
    <p className={className} {...props}>{children}</p>
  ),
  span: ({ children, variants, initial, animate, transition, whileHover, className, ...props }: any) => (
    <span className={className} {...props}>{children}</span>
  ),
  a: ({ children, variants, initial, animate, transition, whileHover, whileTap, onClick, className, ...props }: any) => (
    <a className={className} onClick={onClick} {...props}>{children}</a>
  )
};

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  icon: string;
  technologies: string[];
  liveUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}

interface MousePosition {
  x: number;
  y: number;
}

const ProjectsSection: React.FC = () => {
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const waveRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const [isInView, setIsInView] = useState(false);

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      type: 'Full Stack Web App',
      icon: '🚀',
      description: 'A comprehensive e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard. Built with modern technologies for optimal performance and scalability.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
      liveUrl: 'https://example-ecommerce-platform.vercel.app',
      codeUrl: 'https://github.com/yasarboi/ecommerce-platform',
      featured: true
    },
    {
      id: '2',
      title: 'Social Media Dashboard',
      type: 'React Native + API',
      icon: '📱',
      description: 'Cross-platform mobile application for managing multiple social media accounts with advanced analytics, post scheduling, and engagement tracking. Features real-time notifications and dark mode support.',
      technologies: ['React Native', 'Express.js', 'MongoDB', 'Redis', 'AWS'],
      liveUrl: 'https://social-dashboard-demo.netlify.app',
      codeUrl: 'https://github.com/yasarboi/social-media-dashboard',
      featured: true
    },
    {
      id: '3',
      title: 'AI Content Generator',
      type: 'Machine Learning + Web',
      icon: '🤖',
      description: 'Intelligent content generation platform leveraging machine learning models to create blog posts, social media content, and marketing copy. Features custom model training and API integration.',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'Vue.js', 'GCP'],
      liveUrl: 'https://ai-content-gen.herokuapp.com',
      codeUrl: 'https://github.com/yasarboi/ai-content-generator',
      featured: true
    },
    {
      id: '4',
      title: 'Blockchain Voting System',
      type: 'Web3 Application',
      icon: '🗳️',
      description: 'Decentralized voting platform built on Ethereum with smart contracts, ensuring transparent and tamper-proof elections. Features voter verification and real-time results.',
      technologies: ['Solidity', 'React', 'Web3.js', 'Hardhat', 'IPFS'],
      liveUrl: 'https://blockchain-voting.eth.link',
      codeUrl: 'https://github.com/yasarboi/blockchain-voting-system',
      featured: true
    },
    {
      id: '5',
      title: 'Real-Time Analytics',
      type: 'Data Visualization',
      icon: '📊',
      description: 'Interactive data visualization platform with real-time streaming capabilities, custom dashboard builder, and advanced filtering. Processes millions of data points with sub-second response times.',
      technologies: ['D3.js', 'WebSocket', 'Apache Kafka', 'ClickHouse', 'Kubernetes'],
      liveUrl: 'https://realtime-analytics.example.com',
      codeUrl: 'https://github.com/yasarboi/realtime-analytics',
      featured: true
    },
    {
      id: '6',
      title: 'Cloud Infrastructure Monitor',
      type: 'DevOps Dashboard',
      icon: '☁️',
      description: 'Comprehensive monitoring solution for cloud infrastructure with predictive analytics, automated alerts, and cost optimization recommendations across multiple cloud providers.',
      technologies: ['Go', 'Prometheus', 'Grafana', 'Terraform', 'AWS'],
      liveUrl: 'https://cloud-monitor.example.com',
      codeUrl: 'https://github.com/yasarboi/cloud-infrastructure-monitor',
      featured: true
    }
  ];

  const headerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const projectContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const headerVariants = {
    hidden: { 
      y: 40, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -90,
      opacity: 0
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { 
      x: -30,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const techStackVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.08
      }
    }
  };

  const techTagVariants = {
    hidden: { 
      y: 20,
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const linkVariants = {
    hidden: { 
      y: 30,
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const floatingVariants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 0.6,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 1.5
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    if (!threeContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a1628, 0.8);
    threeContainerRef.current.appendChild(renderer.domElement);

    const waveGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    const waveMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x1e3a8a) },
        color2: { value: new THREE.Color(0x0f172a) }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          float elevation = sin(pos.x * 0.01 + time * 0.5) * 
                           sin(pos.y * 0.01 + time * 0.3) * 20.0;
          pos.z += elevation;
          vElevation = elevation;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          float mixStrength = (vElevation + 20.0) / 40.0;
          vec3 color = mix(color1, color2, mixStrength);
          gl_FragColor = vec4(color, 0.6);
        }
      `,
      transparent: true
    });

    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    wave.rotation.x = -Math.PI / 2;
    wave.position.y = -200;
    scene.add(wave);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.3 + Math.random() * 0.4);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 4 + 1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        attribute float size;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          pos.y += sin(time * 0.5 + position.x * 0.01) * 10.0;
          pos.x += cos(time * 0.3 + position.y * 0.01) * 5.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    particlesRef.current = particles;
    waveRef.current = wave;

    let time = 0;

    const animate = () => {
      if (!particlesRef.current || !rendererRef.current || !sceneRef.current || !waveRef.current) return;

      time += 0.01;

      (waveRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;

      (particlesRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;

      particlesRef.current.rotation.x += (mousePosition.y * 0.00003);
      particlesRef.current.rotation.y += (mousePosition.x * 0.00003);

      particlesRef.current.rotation.y += 0.0008;
      waveRef.current.rotation.z += 0.0005;

      rendererRef.current.render(sceneRef.current, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!rendererRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (threeContainerRef.current && rendererRef.current?.domElement) {
        threeContainerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      rendererRef.current?.dispose();
    };
  }, [mousePosition]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    setMousePosition({
      x: event.clientX - windowHalfX,
      y: event.clientY - windowHalfY
    });
  };

  const handleCardHover = (event: React.MouseEvent<HTMLDivElement>, isHovering: boolean) => {
    const card = event.currentTarget;
    if (!isHovering) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
  };

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ backgroundColor: '#0f172a' }}
    >
      {/* Three.js Background */}
      <div 
        ref={threeContainerRef} 
        className="fixed top-0 left-0 w-full h-full"
        style={{ zIndex: -1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Animation */}
        <motion.div 
          className="text-center mb-20"
          variants={headerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="inline-block mb-6" variants={headerVariants}>
            <span className="text-blue-400 text-lg font-semibold tracking-widest uppercase">
              Portfolio
            </span>
          </motion.div>
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight mb-6"
            variants={headerVariants}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"
            variants={headerVariants}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
            variants={headerVariants}
          >
            Discover innovative solutions and cutting-edge implementations that showcase 
            the intersection of creativity and technical excellence.
          </motion.p>
        </motion.div>

        {/* Projects Masonry Grid */}
        <motion.div 
          className="columns-1 lg:columns-2 xl:columns-3 gap-8 space-y-8"
          variants={projectContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group break-inside-avoid bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 
                         border border-gray-700/50 hover:border-blue-500/60 transition-all duration-700
                         hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer relative overflow-hidden
                         ${project.featured ? 'ring-2 ring-blue-500/30 bg-gray-700/60' : ''}`}
              onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => handleCardHover(e, true)}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => handleCardHover(e, false)}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{ 
                ...(project.featured && {
                  background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(15, 23, 42, 0.8))'
                })
              }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <motion.div 
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 
                             text-white px-4 py-1 rounded-full text-sm font-bold z-10"
                  variants={badgeVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.1 }}
                >
                  Featured
                </motion.div>
              )}

              {/* Project Header */}
              <motion.div 
                className="flex items-center mb-6 relative"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.15 + 0.3 }}
              >
                <motion.div 
                  className={`w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 
                             rounded-2xl flex items-center justify-center text-3xl mr-6 
                             shadow-lg shadow-blue-500/25 ${project.featured ? 'animate-pulse' : ''}`}
                  variants={iconVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 6,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {project.icon}
                </motion.div>
                <motion.div variants={textVariants}>
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors"
                    variants={textVariants}
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p 
                    className="text-blue-300 text-sm uppercase tracking-widest font-semibold"
                    variants={textVariants}
                  >
                    {project.type}
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Project Description */}
              <motion.p 
                className="text-gray-400 text-base leading-relaxed mb-8 font-light"
                variants={textVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.15 + 0.5 }}
              >
                {project.description}
              </motion.p>

              {/* Tech Stack */}
              <motion.div 
                className="flex flex-wrap gap-3 mb-8"
                variants={techStackVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {project.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="bg-gray-700/50 text-blue-200 px-4 py-2 rounded-2xl text-sm font-medium
                               border border-gray-600/50 hover:bg-gray-600/60 hover:border-blue-500/60 
                               transition-all duration-300 cursor-pointer"
                    variants={techTagVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)"
                    }}
                    transition={{ delay: index * 0.15 + 0.7 + techIndex * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {/* Project Links */}
              <motion.div 
                className="flex gap-4 flex-wrap"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.15 + 1.0 }}
              >
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 
                               text-white px-6 py-3 rounded-xl font-semibold text-sm
                               hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 
                               transition-all duration-500 group/link
                               hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/40
                               active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                    variants={linkVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      // Visual feedback on click
                      e.currentTarget.style.transform = 'scale(0.95) translateY(-2px)';
                      setTimeout(() => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }, 150);
                    }}
                  >
                    <motion.span 
                      className="text-lg"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      🌐
                    </motion.span>
                    <span className="relative">
                      Live Demo
                      <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    </span>
                  </motion.a>
                )}
                {project.codeUrl && (
                  <motion.a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-transparent text-blue-200 
                               px-6 py-3 rounded-xl font-semibold text-sm border-2 border-blue-500/40
                               hover:bg-blue-900/30 hover:border-blue-400/70 transition-all duration-500 group/link
                               hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20
                               active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                    variants={linkVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      // Visual feedback on click
                      e.currentTarget.style.transform = 'scale(0.95) translateY(-2px)';
                      setTimeout(() => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }, 150);
                    }}
                  >
                    <motion.span 
                      className="text-lg"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      💻
                    </motion.span>
                    <span className="relative">
                      Source Code
                      <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    </span>
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="fixed top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60"
        variants={floatingVariants}
        initial="hidden"
        animate={isInView ? {
          scale: 1,
          opacity: 0.6,
          y: [0, -20, 0]
        } : "hidden"}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatType: "loop" 
        }}
      />
      <motion.div 
        className="fixed top-40 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-40"
        variants={floatingVariants}
        initial="hidden"
        animate={isInView ? {
          scale: 1,
          opacity: 0.4,
          y: [0, -15, 0],
          x: [0, 10, 0]
        } : "hidden"}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "loop",
          delay: 1
        }}
      />
      <motion.div 
        className="fixed bottom-32 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-50"
        variants={floatingVariants}
        initial="hidden"
        animate={isInView ? {
          scale: [1, 1.2, 1],
          opacity: 0.5,
          y: [0, -10, 0]
        } : "hidden"}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          repeatType: "loop",
          delay: 2
        }}
      />
    </section>
  );
};

export default ProjectsSection;