import React from 'react';

function ContentPanel({ activeSection, hoveredCardIdx, setHoveredCardIdx, setExpandedImg }: {
  activeSection: string,
  hoveredCardIdx: number | null,
  setHoveredCardIdx: (idx: number | null) => void,
  setExpandedImg: (img: string | null) => void
}) {
  return (
    <div className="w-full md:ml-[35%] md:w-[65%] min-h-screen p-4 md:p-8 overflow-y-auto">
      <div
        id="experience"
        className={`flex flex-col gap-8 text-sm md:pt-8 transition-opacity duration-300 ${activeSection === 'experience' ? 'opacity-100' : 'opacity-0 hidden'}`}
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
            <h3 className="text-lg font-russo text-white mb-2">{exp.title}</h3>
            <p className="text-gray-400 mb-4">{exp.date}</p>
            <ul className="list-disc text-gray-300 space-y-2 ml-4">
              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div
        id="projects"
        className={`flex flex-col gap-12 md:pt-8 transition-opacity duration-300 ${activeSection === 'projects' ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        <div
          className={`project-item bg-gray-400/10 p-6 rounded-lg shadow-lg transition-transform duration-200 ${hoveredCardIdx === 99 ? 'scale-[1.05]' : ''}`}
          onMouseEnter={() => setHoveredCardIdx(99)}
          onMouseLeave={() => setHoveredCardIdx(null)}
        >
          <h3 className="text-lg font-russo text-white mb-2">Drag-And-Drop Form Builder</h3>
          <a
            href="https://github.com/Nazifhanif1/Form-Builder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 mb-2 inline-block text-sm"
          >
            View on GitHub
          </a>
          <p className="text-gray-300 mb-2 text-sm">Form Builder is a drag-and-drop web application that allows users to visually create custom forms. Users can select from a variety of form elements (such as headings, text fields, email, address, dropdowns, checkboxes, and more) and arrange them on a canvas. The form layout can be reordered via drag-and-drop.</p>
          <ul className="list-disc text-gray-300 space-y-2 ml-4 text-sm">
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
            />
            <img
              src={`${process.env.PUBLIC_URL}/form-builder-app-ss1.png`}
              alt="Form Builder Screenshot"
              className="w-1/2 h-auto object-cover rounded-lg shadow-lg cursor-zoom-in"
              onClick={() => setExpandedImg(`${process.env.PUBLIC_URL}/form-builder-app-ss1.png`)}
            />
          </div>
        </div>

        <div
          className={`project-item bg-gray-400/10 p-6 rounded-lg shadow-lg transition-transform duration-200 ${hoveredCardIdx === 98 ? 'scale-[1.05]' : ''}`}
          onMouseEnter={() => setHoveredCardIdx(98)}
          onMouseLeave={() => setHoveredCardIdx(null)}
        >
          <h3 className="text-lg font-russo text-white mb-2">Knight's Tour Visualizer</h3>
          <a
            href="https://github.com/Nazifhanif1/knights-tour-visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 mb-2 inline-block text-sm"
          >
            View on GitHub
          </a>
          <p className="text-gray-300 mb-2 text-sm">
            Knight's Tour Visualizer is a React application that solves and animates the Knight's Tour problem on a chessboard of configurable size. The knight must visit every square exactly once, and the app demonstrates the solution step-by-step using Warnsdorff’s heuristic.
          </p>
          <ul className="list-disc text-gray-300 space-y-2 ml-4 text-sm">
            <li>Configurable board size (from 5x5 to 20x20).</li>
            <li>Automatically finds a solution using Warnsdorff’s heuristic.</li>
            <li>Step-by-step animation showing the knight's movement across the board.</li>
            <li>Responsive design: the board and cells resize to fit your screen.</li>
          </ul>
          <div className='flex gap-4 w-full mt-4'>
            <img
              src={`${process.env.PUBLIC_URL}/knights-tour.gif`}
              alt="Form Builder Screenshot"
              className="w-1/2 h-auto object-cover rounded-lg shadow-lg cursor-zoom-in"
              onClick={() => setExpandedImg(`${process.env.PUBLIC_URL}/knights-tour.gif`)}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ContentPanel;