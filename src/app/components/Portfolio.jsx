"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ExternalLink,
  Github,
  GraduationCap,
  Briefcase,
  User,
  Code,
  FileText,
  Linkedin,
  Mail,
  Users,
} from "lucide-react";

import Image from "next/image";

// Add Google Font
if (typeof window !== "undefined") {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

// Space Background Component
const SpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = [];
    const shootingStars = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      stars.length = 0;
      const starCount = Math.floor((canvas.width * canvas.height) / 1000);

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    };

    const createShootingStar = () => {
      const side = Math.random() < 0.5 ? 'top' : 'left';
      const shootingStar = {
        x: side === 'top' ? Math.random() * canvas.width : -50,
        y: side === 'top' ? -50 : Math.random() * canvas.height,
        vx: (Math.random() * 3 + 2) * (side === 'top' ? (Math.random() < 0.5 ? 1 : -1) : 1),
        vy: (Math.random() * 3 + 2) * (side === 'left' ? (Math.random() < 0.5 ? 1 : -1) : 1),
        length: Math.random() * 80 + 20,
        opacity: 1,
        life: 1,
      };
      shootingStars.push(shootingStar);
    };

    const updateShootingStars = () => {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.01;
        star.opacity = star.life;

        if (star.life <= 0 || star.x > canvas.width + 100 || star.y > canvas.height + 100 || star.x < -100 || star.y < -100) {
          shootingStars.splice(i, 1);
        }
      }
    };

    const drawShootingStars = () => {
      shootingStars.forEach((star) => {
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.vx * star.length / 10, star.y - star.vy * star.length / 10
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(135, 206, 250, ${star.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * star.length / 10, star.y - star.vy * star.length / 10);
        ctx.stroke();
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw shooting stars
      updateShootingStars();
      drawShootingStars();

      // Occasionally create new shooting stars
      if (Math.random() < 0.01) { // Adjust frequency here (0.003 = ~0.3% chance per frame)
        createShootingStar();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
};

// Floating Astronaut Component
const Astronaut = ({ index }) => {
  const reduce = useReducedMotion();
  const startY = 5 + index * 5 + Math.random() * 50;
  const durX = 20 + Math.random() * 10;
  const durY = 4 + Math.random() * 10; // shorter, snappier bob
  const delay = index * 3;

  const animateProps = reduce
    ? {}
    : {
        x: ["-10vw", "110vw"],
        y: [0, -50, 50, 0], // ±50px vertical bob
        rotate: [0, 360],
      };

  const transitionProps = reduce
    ? {}
    : {
        x: { duration: durX, ease: "linear", repeat: Infinity, delay },
        y: { duration: durY, ease: "easeInOut", repeat: Infinity, delay },
        rotate: { duration: 5, ease: "linear", repeat: Infinity, delay },
      };

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{ left: "-10vw", top: `${startY}%` }}
      animate={animateProps}
      transition={transitionProps}
      aria-hidden="true"
    >
      <Image
        src="/astro.png"
        alt=""
        width={40}
        height={40}
        className="w-8 h-8 md:w-10 md:h-10"
      />
    </motion.div>
  );
};

// Project Card Component
const ProjectCard = ({ title, description, github, demo }) => {
  const handleClick = () => {
    if (demo) {
      window.open(demo, '_blank');
    } else if (github) {
      window.open(github, '_blank');
    }
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:border-white/20 hover:bg-white/10 cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-3 space-y-2">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="text-xs text-gray-300 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

// Experience Card Component
const ExperienceCard = ({
  title,
  company,
  period,
}) => {
  return (
    <div className="relative pl-6 pb-4 border-l-2 border-white/10 last:border-l-0">
      <div className="absolute left-0 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-black" />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-blue-300">
          {company} • {period}
        </p>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ icon: Icon, title, children, id }) => {
  return (
    <section
      id={id}
      className="relative py-12 md:py-16"
      aria-labelledby={`${id}-title`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Icon className="w-6 h-6 text-blue-400" />
          <h2
            id={`${id}-title`}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
};

// Main Portfolio Component
export default function Portfolio() {
  // Sample data - replace with your actual data
  const projects = [
    {
      title: "Crossie",
      description: "Chrome Extension for website annotation (500+ users)",
      demo: "https://trycrossie.vercel.app"
    },
    {
      title: "Dr. Terp",
      description: "Course decision platform for UMD students (2,000+ visits)",
      demo: "https://terpcord.vercel.app"
    },
    {
      title: "Craving Hour Halal",
      description: "Food truck website with admin portal (200+ daily visits)",
      demo: "https://www.cravinghourhalal.com"
    },
  ]

  const extracurriculars = [
    {
      title: "Project LIFT",
      description: "Club helping 5+ small businesses save $50,000+ through tech solutions",
      github: "https://projectliftumd.com"
    },
    {
      title: "Startup Shell Fellow",
      description: "Startup Incubator for UMD students with $2 billion in venture value",
      github: "https://startupshell.org"
    },
    {
      title: "Rock Climbing Athlete",
      description: "Competitive Rock Climbing Athlete on UMD's Team",
    }
  ]

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "4a Consulting, LLC",
      period: "May 2025 - August 2025"
    },
    {
      title: "Undergraduate Research Assistant - Quantum Machine Learning",
      company: "University of Maryland, College Park",
      period: "January 2025 - Present"
    },
    {
      title: "Software Engineer Intern",
      company: "Mildenberg Boender & Associates",
      period: "May 2024 - August 2024"
    },
    {
      title: "Chief Technology Officer",
      company: "GeneticFit Labs",
      period: "September 2024 - March 2025"
    }
  ]

  const education = [
    {
      degree: "B.S. Computer Science & Mathematics",
      school: "University of Maryland, College Park",
      period: "2024-2027",
      focus: ""
    },
  ]

  return (
    <div
      className="min-h-screen text-white relative"
      style={{ fontFamily: "Space Grotesk, sans-serif" }}
    >
      <SpaceBackground />
      <Astronaut index={0} />
      <Astronaut index={1} />
      <Astronaut index={2} />
      <Astronaut index={3} />
      <Astronaut index={4} />
      <Astronaut index={5} />
      <Astronaut index={6} />
      <Astronaut index={7} />

      
      <main className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Name and About */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Hashem Alomar
                </h1>
                <p className="text-lg text-gray-300 mb-4">
                  Computer Science and Mathematics '27 @ UMD, College Park
                </p>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">Experience</h2>
                  </div>
                  <div className="space-y-3">
                    {experiences.map((exp, index) => (
                      <ExperienceCard key={index} {...exp} />
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>

            

            {/* Right Column */}
            <div className="space-y-8">
                            {/* Contact Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </a>
                <a
                  href="https://github.com/hashemalo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/hashem-alomar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:halomar@terpmail.umd.edu"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </motion.div>
              {/* Projects */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Projects</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                  ))}
                </div>
              </motion.div>

              {/* Extracurriculars */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Extracurriculars</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {extracurriculars.map((item, index) => (
                    <ProjectCard key={index} {...item} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
