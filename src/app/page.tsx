// pages/index.tsx
"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image"; // Make sure to import Image
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  image?: string;
  link: string;
}

const projectsData: Project[] = [
  {
    title: "Project Alpha",
    description: "A comprehensive web application for data visualization.",
    image: "/project-alpha.jpg",
    link: "/projects/alpha",
  },
  {
    title: "Project Beta",
    description: "Mobile app design focused on user-centric experience.",
    image: "/project-beta.jpg",
    link: "/projects/beta",
  },
  {
    title: "Project Gamma",
    description: "Interactive 3D rendering engine for architectural models.",
    image: "/project-gamma.jpg",
    link: "/projects/gamma",
  },
  {
    title: "Project Delta",
    description: "E-commerce platform with custom CRM integration.",
    image: "/project-delta.jpg",
    link: "/projects/delta",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hide the loading animation after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds for the animation

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Your horizontal scroll logic from before
  useEffect(() => {
    if (isLoading) return; // Don't attach scroll listener while loading

    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      if (container) {
        container.removeEventListener("wheel", onWheel);
      }
    };
  }, [isLoading]); // Rerun this effect when isLoading changes

  // Render the animation screen
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="text-6xl font-bold name-animation">
          {/* Split your name into spans for individual letter animation */}
          <span style={{ animationDelay: "0.2s" }}>T</span>
          <span style={{ animationDelay: "0.3s" }}>a</span>
          <span style={{ animationDelay: "0.4s" }}>n</span>
          <span style={{ animationDelay: "0.5s" }}>i</span>
          <span style={{ animationDelay: "0.6s" }}>s</span>
          <span style={{ animationDelay: "0.7s" }}>h</span>
          <span style={{ animationDelay: "0.8s" }}> </span>
          <span style={{ animationDelay: "0.9s" }}>P</span>
          <span style={{ animationDelay: "1.0s" }}>r</span>
          <span style={{ animationDelay: "1.1s" }}>a</span>
          <span style={{ animationDelay: "1.2s" }}>d</span>
          <span style={{ animationDelay: "1.3s" }}>h</span>
          <span style={{ animationDelay: "1.4s" }}>a</span>
          <span style={{ animationDelay: "1.5s" }}>n</span>
          <span style={{ animationDelay: "1.6s" }}> </span>
          <span style={{ animationDelay: "1.7s" }}>W</span>
          <span style={{ animationDelay: "1.8s" }}>o</span>
          <span style={{ animationDelay: "1.9s" }}>n</span>
          <span style={{ animationDelay: "2.0s" }}>g</span>
          <span style={{ animationDelay: "2.1s" }}> </span>
          <span style={{ animationDelay: "2.2s" }}>A</span>
          <span style={{ animationDelay: "2.3s" }}>h</span>
          <span style={{ animationDelay: "2.4s" }}> </span>
          <span style={{ animationDelay: "2.5s" }}>S</span>
          <span style={{ animationDelay: "2.6s" }}>u</span>
          <span style={{ animationDelay: "2.7s" }}>i</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark bg-neutral-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-10 p-4 bg-neutral-950/80 backdrop-blur-sm flex justify-center gap-6">
        <button
          onClick={() =>
            scrollContainerRef.current?.scrollTo({
              left: 0,
              behavior: "smooth",
            })
          }
          className="hover:underline"
        >
          About
        </button>
        <button
          onClick={() =>
            // Using window.innerWidth is a good approach for full-screen sections
            scrollContainerRef.current?.scrollTo({
              left: window.innerWidth * 1,
              behavior: "smooth",
            })
          }
          className="hover:underline"
        >
          Experience
        </button>
        <button
          onClick={() =>
            scrollContainerRef.current?.scrollTo({
              left: window.innerWidth * 2,
              behavior: "smooth",
            })
          }
          className="hover:underline"
        >
          Projects
        </button>
        <button
          onClick={() =>
            scrollContainerRef.current?.scrollTo({
              left: window.innerWidth * 3,
              behavior: "smooth",
            })
          }
          className="hover:underline"
        >
          Contact
        </button>
      </nav>

      {/* Main Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex flex-row overflow-x-scroll overflow-y-hidden h-screen w-screen scrollbar-hide"
        style={{
          background: "linear-gradient(90deg, #171717 0%, #23272f 100%)",
          // We remove scroll-behavior from here to allow for instant wheel scrolling
        }}
      >
        {/* Sections (no changes needed here) */}
        <section
          id="about"
          className="flex-none w-screen h-screen flex items-center justify-center p-8 text-center section-gradient-1"
        >
          <div>
            <h1 className="text-6xl font-bold mb-4">
              Hello, I'm Tanish Pradhan Wong Ah Sui
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              A passionate [Your Profession] specializing in [Your Niche]. I
              build beautiful and functional experiences.
            </p>
          </div>
        </section>

        <section
          id="experience"
          className="flex-none w-screen h-screen flex items-center justify-center p-8 text-center section-gradient-2"
        >
          <div>
            <h2 className="text-5xl font-bold mb-8">My Experience</h2>
            <div className="space-y-6 max-w-3xl mx-auto text-left">
              <div>
                <h3 className="text-3xl font-semibold">
                  Senior Developer @ TechCorp
                </h3>
                <p className="text-lg text-neutral-300">Jan 2022 - Present</p>
                <ul className="list-disc list-inside mt-2 text-neutral-200">
                  <li>
                    Led development of scalable backend services for major
                    client.
                  </li>
                  <li>
                    Mentored junior developers and conducted code reviews.
                  </li>
                  <li>
                    Improved system performance by 30% through optimization.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-3xl font-semibold">
                  Junior Developer @ InnovateX
                </h3>
                <p className="text-lg text-neutral-300">July 2019 - Dec 2021</p>
                <ul className="list-disc list-inside mt-2 text-neutral-200">
                  <li>
                    Developed front-end components using React and Next.js.
                  </li>
                  <li>
                    Contributed to database schema design and API integration.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="flex-none w-screen h-screen flex items-center justify-center p-8 text-center section-gradient-3"
        >
          <div>
            <h2 className="text-5xl font-bold mb-8">My Projects</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Explore a selection of my key works and case studies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {projectsData.slice(0, 3).map((project, index) => (
                <div
                  key={index}
                  className="bg-neutral-800 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-neutral-300 mb-4">{project.description}</p>
                  <Link href={project.link}>
                    <p className="text-blue-400 hover:underline">
                      View Details
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="flex-none w-screen h-screen flex items-center justify-center p-8 text-center section-gradient-4"
        >
          <div>
            <h2 className="text-5xl font-bold mb-8">Get In Touch</h2>
            <p className="text-xl mb-6">
              I'm always open to new opportunities and collaborations.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="mailto:your.email@example.com">
                <p className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg transition-colors">
                  Email Me
                </p>
              </Link>
              <Link href="https://linkedin.com/in/yourprofile">
                <p className="px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg text-white text-lg transition-colors">
                  LinkedIn
                </p>
              </Link>
              <Link href="/your-resume.pdf" download>
                <p className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-lg transition-colors">
                  Download Resume
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
