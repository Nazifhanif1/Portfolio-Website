import React, { useEffect, useRef, useState } from 'react';

const navLinks = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "cv", label: "CV", isExternal: true },
];

function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [linkIsHovered, setLinkIsHovered] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('experience');
  const [expandedImg, setExpandedImg] = useState<string | null>(null);
  const [hideCursor, setHideCursor] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const editCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursor) {
          const scale = linkIsHovered ? 'scale(3)' : 'scale(1)';
          cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) ${scale}`;
        }
      });
    };

    window.addEventListener('mousemove', editCursor);
    return () => window.removeEventListener('mousemove', editCursor);
  }, [linkIsHovered]);

  useEffect(() => {
    const links = document.querySelectorAll('.hover-this');

    const animateit = function (this: HTMLElement, e: MouseEvent) {
      const elements = this.querySelectorAll('span');
      if (!elements.length) return;

      const { offsetX: x, offsetY: y } = e;
      const { offsetWidth: width, offsetHeight: height } = this;
      const move = 25;
      const xMove = (x / width) * (move * 2) - move;
      const yMove = (y / height) * (move * 2) - move;

      elements.forEach(el => {
        el.style.transform = `translate(${xMove}px, ${yMove}px)`;
        if (e.type === 'mouseleave') el.style.transform = '';
      });
    };

    links.forEach(link => {
      link.addEventListener('mousemove', animateit as EventListener);
      link.addEventListener('mouseleave', animateit as EventListener);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('mousemove', animateit as EventListener);
        link.removeEventListener('mouseleave', animateit as EventListener);
      });
    };
  }, []);

  const handleSectionChange = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
  };

  return (
    <div className={`relative min-h-screen bg-[#161616] cursor-none`}>
      {expandedImg && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-80 cursor-default"
          onClick={() => setExpandedImg(null)}
        >
          <img
            src={expandedImg}
            alt="Expanded"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      <div
        ref={cursorRef}
        className={`custom-cursor fixed z-[9999] w-4 h-4 bg-white rounded-full pointer-events-none transition-transform duration-100 ease-out mix-blend-difference${hideCursor ? ' opacity-0' : ''}`}
        style={{ top: 0, left: 0 }}
      />
      <div className="w-full h-screen bg-[#161616] flex">
        <div className="w-[40%] h-[75%] p-8 flex flex-col items-center justify-between self-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-center font-russo font-normal text-white text-3xl uppercase">
              Nazif Mohamed Hanif
            </span>
            <span className="font-russo text-gray-400">(Frontend, Web, CRO) Developer</span>
          </div>

          <nav className="flex flex-col gap-8 items-center justify-center w-full">
            {navLinks.map(link =>
              link.id === "cv" ? (
                <a
                  key={link.id}
                  href="Nazif-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover-this w-full h-full flex justify-center items-center gap-2 px-4 py-5 md:py-0 transition-all duration-300 cursor-none`}
                  onMouseEnter={() => setLinkIsHovered(true)}
                  onMouseLeave={() => setLinkIsHovered(false)}
                >
                  <span className={`inline-block font-russo font-normal text-white text-3xl uppercase transition-transform duration-100`}>
                    {link.label}
                  </span>
                  <span className="inline-flex transition-transform duration-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>
              ) : (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`hover-this w-full h-full flex justify-center items-center gap-2 px-4 py-5 md:py-0 transition-all duration-300 cursor-none`}
                  onClick={e => handleSectionChange(e, link.id)}
                  onMouseEnter={() => setLinkIsHovered(true)}
                  onMouseLeave={() => setLinkIsHovered(false)}
                >
                  <span className={`inline-block font-russo font-normal text-white text-3xl uppercase transition-transform duration-100 ${activeSection === link.id ? 'border-b-2 border-white' : ''}`}>
                    {link.label}
                  </span>
                  {link.isExternal && link.id !== "cv" && (
                    <span className="inline-flex transition-transform duration-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </span>
                  )}
                </a>
              )
            )}
          </nav>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-mono text-sm">nazifhanif28@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-mono text-sm">(+44)7824982671</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <a
                className="hover-this"
                href="https://www.linkedin.com/in/nhanif1/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setLinkIsHovered(true)}
                onMouseLeave={() => setLinkIsHovered(false)}
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.599v5.597z" />
                </svg>
              </a>
              <a
                className="hover-this"
                href="https://github.com/Nazifhanif1"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setLinkIsHovered(true)}
                onMouseLeave={() => setLinkIsHovered(false)}
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="w-[60%] min-h-screen p-8 overflow-y-auto">
          <div
            id="experience"
            className={`flex flex-col gap-8 pt-8 transition-opacity duration-300 ${activeSection === 'experience' ? 'opacity-100' : 'opacity-0 hidden'
              }`}
          >
            {[
              {
                title: "CRO Web Developer – Charles Tyrwhitt",
                date: "09/2024 – Present",
                bullets: [
                  "Developed and optimized A/B tests, improving site performance and user experience using JavaScript, jQuery, HTML, and CSS.",
                  "Built and maintained tracking solutions using Adobe Launch, integrating analytics to measure user behavior.",
                  "Developed a multi-buy tracker, increasing conversion rate by 12% and revenue per visitor by 7%.",
                  "Spearheaded a product page refresh, reducing bounce rate by 3% and increasing add-to-bag rate by 2%.",
                  "Engineered dynamic promotional features like personalized sales callouts and price highlights to enhance engagement.",
                  "Developed custom data-gathering scripts to track ad performance across Amazon, Meta, and other platforms, providing key insights for marketing optimization.",
                  "Collaborated cross-functionally with marketing, UX designers, and trade teams to implement personalized user experiences.",
                  "Overcame challenges of server-side restrictions by optimizing front-end solutions and leveraging server-rendered data effectively.",
                ]
              },
              {
                title: "Full-Stack Software Engineer – JP Morgan Chase",
                date: "11/2022 – 07/2023",
                bullets: [
                  "Developed and maintained applications following the MVC architecture, improving maintainability and code reusability.",
                  "Built a UI and REST API to allow users to upload and store Excel data in a centralized database.",
                  "Optimized SQL queries, reducing API response times by 15% and improving data retrieval efficiency.",
                  "Led a mass dependency upgrade, removing 20% of unused, redundant, and vulnerable dependencies across multiple microservices.",
                  "Implemented new UI components using React and TypeScript to enhance the front-end experience.",
                  "Improved test coverage by 10% using Junit and Jest, ensuring code quality and reliability.",
                  "Conducted code reviews, identifying and fixing bugs while promoting collaboration across teams.",
                ]
              },
              {
                title: "Java Training Camp – Wiley Edge, London",
                date: "08/2022 – 09/2022",
                bullets: [
                  "Gained expertise in Java and Spring Boot, focusing on backend development in business applications.",
                  "Learned full-stack development principles, including RESTful API creation and database management.",
                  "Practiced writing clean, efficient, and maintainable code while adhering to best practices.",
                ]
              }
            ].map((exp, idx) => (
              <div
                key={exp.title}
                className={`experience-item bg-gray-400/10 p-6 rounded-lg shadow-lg transition-transform duration-200 ${hoveredCardIdx === idx ? 'scale-[1.05]' : ''}`}
                onMouseEnter={() => setHoveredCardIdx(idx)}
                onMouseLeave={() => setHoveredCardIdx(null)}
              >
                <h3 className="text-2xl font-russo text-white mb-2">{exp.title}</h3>
                <p className="text-gray-400 mb-4">{exp.date}</p>
                <ul className="list-disc text-gray-300 space-y-2 ml-4">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div
            id="projects"
            className={`flex flex-col gap-12 pt-8 transition-opacity duration-300 ${activeSection === 'projects' ? 'opacity-100' : 'opacity-0 hidden'}`}
          >
            <div
              className={`project-item bg-gray-400/10 p-6 rounded-lg shadow-lg transition-transform duration-200 ${hoveredCardIdx === 99 ? 'scale-[1.05]' : ''}`}
              onMouseEnter={() => setHoveredCardIdx(99)}
              onMouseLeave={() => setHoveredCardIdx(null)}
            >
              <h3 className="text-2xl font-russo text-white mb-2">Drag-And-Drop Form Builder</h3>
              <p className="text-gray-300 mb-2">Form Builder is a drag-and-drop web application that allows users to visually create custom forms. Users can select from a variety of form elements (such as headings, text fields, email, address, dropdowns, checkboxes, and more) and arrange them on a canvas. The form layout can be reordered via drag-and-drop.</p>
              <ul className="list-disc text-gray-300 space-y-2 ml-4">
                <li>Bootstrapped with Create React App for a modern React/TypeScript setup.</li>
                <li>Tailwind CSS is used for styling, enabling utility-first, responsive design.</li>
                <li>Drag-and-drop functionality is powered by Atlaskit’s pragmatic-drag-and-drop library.</li>
                <li>Component-based architecture: Each form element is a reusable React component.</li>
                <li>Clipboard utilities allow users to export their form’s HTML, CSS, and JS for use elsewhere.</li>
              </ul>
              <div className='flex gap-4 w-full mt-4'>
                <img
                  src={`${process.env.PUBLIC_URL}/form-builder-app-ss2.png`}
                  alt="Form Builder Screenshot"
                  className="w-1/2 h-auto object-cover rounded-lg shadow-lg cursor-zoom-in"
                  onClick={() => setExpandedImg(`${process.env.PUBLIC_URL}/form-builder-app-ss2.png`)}
                  onMouseEnter={() => setHideCursor(true)}
                  onMouseLeave={() => setHideCursor(false)}
                />
                <img
                  src={`${process.env.PUBLIC_URL}/form-builder-app-ss1.png`}
                  alt="Form Builder Screenshot"
                  className="w-1/2 h-auto object-cover rounded-lg shadow-lg cursor-zoom-in"
                  onClick={() => setExpandedImg(`${process.env.PUBLIC_URL}/form-builder-app-ss1.png`)}
                  onMouseEnter={() => setHideCursor(true)}
                  onMouseLeave={() => setHideCursor(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
