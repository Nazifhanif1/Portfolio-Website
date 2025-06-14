import React from 'react';

const navLinks = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "cv", label: "CV", isExternal: true },
];

function DesktopNav({ activeSection, onSectionChange }: { activeSection: string, onSectionChange: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void }) {
  return (
    <nav className="hidden md:flex flex-col gap-6 md:gap-8 items-center justify-center w-full mt-6 md:mt-0">
      {navLinks.map(link => {
        const isActive = activeSection === link.id;
        const baseSpan = `relative md:inline-block md:font-russo md:font-normal md:text-white md:text-3xl md:uppercase`;
        const underline =
          `absolute left-0 -bottom-1 h-[2px] w-full bg-white origin-left scale-x-0 transition-transform duration-300` +
          (isActive ? ' scale-x-100' : '') +
          ' group-hover/link:scale-x-100';
        return link.id === "cv" ? (
          <a
            key={link.id}
            href="Nazif-CV.pdf"
            className={`
              hover-this w-full h-full flex justify-center items-center gap-2 px-4 py-3 md:py-0 transition-all duration-300 
              bg-[#232323] rounded-lg shadow border border-[#333] 
              text-white font-russo text-xl uppercase
              hover:bg-[#313131] focus:bg-[#313131] outline-none
              md:bg-transparent md:rounded-none md:shadow-none md:border-0 md:text-3xl md:font-normal md:uppercase md:hover:bg-transparent md:focus:bg-transparent
            `}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={baseSpan}>
              {link.label}
              <span className={underline} style={{ transitionProperty: 'transform' }} />
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>
        ) : (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`
              hover-this group/link w-full h-full flex justify-center items-center gap-2 px-4 py-3 md:py-0 transition-all duration-300
              bg-[#232323] rounded-lg shadow border border-[#333] 
              text-white font-russo text-xl uppercase
              hover:bg-[#313131] focus:bg-[#313131] outline-none
              ${isActive ? 'font-bold' : ''}
              md:bg-transparent md:rounded-none md:shadow-none md:border-0 md:text-3xl md:font-normal md:uppercase md:hover:bg-transparent md:focus:bg-transparent md:font-normal
            `}
            onClick={e => onSectionChange(e, link.id)}
            tabIndex={0}
          >
            <span className={baseSpan}>
              {link.label}
              <span className={underline} style={{ transitionProperty: 'transform' }} />
            </span>
            {link.isExternal && link.id !== "cv" && (
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            )}
          </a>
        );
      })}
    </nav>
  );
}

export default DesktopNav;