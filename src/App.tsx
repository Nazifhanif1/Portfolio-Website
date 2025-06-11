import React, { useEffect, useRef, useState } from 'react';

const navLinks = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "cv", label: "CV", isExternal: true },
];

function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState('experience');

  // Cursor movement effect
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const editCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursor) {
          const scale = isHovered ? 'scale(2)' : 'scale(1)';
          cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) ${scale}`;
        }
      });
    };

    window.addEventListener('mousemove', editCursor);
    return () => window.removeEventListener('mousemove', editCursor);
  }, [isHovered]);

  // Hover animation effect
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
    <div className="relative min-h-screen bg-[#161616] cursor-none">
      <div
        ref={cursorRef}
        className="custom-cursor fixed z-[9999] w-8 h-8 bg-white rounded-full pointer-events-none transition-transform duration-100 ease-out mix-blend-difference"
        style={{ top: 0, left: 0 }}
      />
      <div className="w-full h-screen bg-[#161616] flex">
        <div className="w-[40%] min-h-screen p-8 flex flex-col items-center justify-center">
          <div className="pb-20 flex flex-col justify-center items-center">
            <span className="text-center font-russo font-normal text-white text-3xl uppercase">
              Nazif Mohamed Hanif
            </span>
            <span className="font-russo text-gray-400">(Frontend, Web, CRO) Developer</span>
          </div>

          <nav className="flex flex-col gap-8 items-center justify-center w-full">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`hover-this w-full h-full flex justify-center items-center gap-2 px-4 py-5 md:py-0 transition-all duration-300 cursor-none`}
                onClick={(e) => handleSectionChange(e, link.id)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className={`inline-block font-russo font-normal text-white text-3xl uppercase transition-transform duration-100 ${activeSection === link.id ? 'border-b-2 border-white' : ''
                  }`}>
                  {link.label}
                </span>
                {link.isExternal && (
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
            ))}
          </nav>
        </div>
        <div className="w-[60%] min-h-screen p-8 overflow-y-auto">
          <div
            id="experience"
            className={`flex flex-col gap-12 pt-8 transition-opacity duration-300 ${activeSection === 'experience' ? 'opacity-100' : 'opacity-0 hidden'
              }`}
          >

            <div className="experience-item">
              <h3 className="text-2xl font-russo text-white mb-2">CRO Web Developer – Charles Tyrwhitt</h3>
              <p className="text-gray-400 mb-4">09/2024 – Present</p>
              <ul className="list-disc text-gray-300 space-y-2 ml-4">
                <li>Developed and optimized A/B tests, improving site performance and user experience using JavaScript, jQuery, HTML, and CSS.</li>
                <li>Built and maintained tracking solutions using Adobe Launch, integrating analytics to measure user behavior.</li>
                <li>Developed a multi-buy tracker, increasing conversion rate by 12% and revenue per visitor by 7%.</li>
                <li>Spearheaded a product page refresh, reducing bounce rate by 3% and increasing add-to-bag rate by 2%.</li>
                <li>Engineered dynamic promotional features like personalized sales callouts and price highlights to enhance engagement.</li>
                <li>Developed custom data-gathering scripts to track ad performance across Amazon, Meta, and other platforms, providing key insights for marketing optimization.</li>
                <li>Collaborated cross-functionally with marketing, UX designers, and trade teams to implement personalized user experiences.</li>
                <li>Overcame challenges of server-side restrictions by optimizing front-end solutions and leveraging server-rendered data effectively.</li>
              </ul>
            </div>

            <div className="experience-item">
              <h3 className="text-2xl font-russo text-white mb-2">Full-Stack Software Engineer – JP Morgan Chase</h3>
              <p className="text-gray-400 mb-4">11/2022 – 07/2023</p>
              <ul className="list-disc text-gray-300 space-y-2 ml-4">
                <li>Developed and maintained applications following the MVC architecture, improving maintainability and code reusability.</li>
                <li>Built a UI and REST API to allow users to upload and store Excel data in a centralized database.</li>
                <li>Optimized SQL queries, reducing API response times by 15% and improving data retrieval efficiency.</li>
                <li>Led a mass dependency upgrade, removing 20% of unused, redundant, and vulnerable dependencies across multiple microservices.</li>
                <li>Implemented new UI components using React and TypeScript to enhance the front-end experience.</li>
                <li>Improved test coverage by 10% using Junit and Jest, ensuring code quality and reliability.</li>
                <li>Conducted code reviews, identifying and fixing bugs while promoting collaboration across teams.</li>
              </ul>
            </div>

            <div className="experience-item">
              <h3 className="text-2xl font-russo text-white mb-2">Java Training Camp – Wiley Edge, London</h3>
              <p className="text-gray-400 mb-4">08/2022 – 09/2022</p>
              <ul className="list-disc text-gray-300 space-y-2 ml-4">
                <li>Gained expertise in Java and Spring Boot, focusing on backend development in business applications.</li>
                <li>Learned full-stack development principles, including RESTful API creation and database management.</li>
                <li>Practiced writing clean, efficient, and maintainable code while adhering to best practices.</li>
              </ul>
            </div>
          </div>
          <div
            id="projects"
            className={`flex flex-col gap-12 pt-8 transition-opacity duration-300 ${activeSection === 'projects' ? 'opacity-100' : 'opacity-0 hidden'}`}
          >
            <div className="project-item">
              <h3 className="text-2xl font-russo text-white mb-2">Drag-And-Drop Form Builder</h3>
              <div className='flex gap-4 w-full'>
                <img
                  src={`${process.env.PUBLIC_URL}/form-builder-app-ss2.png`}
                  alt="Form Builder Screenshot"
                  className="w-1/2 h-auto object-cover rounded-lg shadow-lg"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/form-builder-app-ss1.png`}
                  alt="Form Builder Screenshot"
                  className="w-1/2 h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          <div
            id="contact"
            className={`flex flex-col gap-12 pt-8 transition-opacity duration-300 ${activeSection === 'contact' ? 'opacity-100' : 'opacity-0 hidden'
              }`}
          >
            Contact content here
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
