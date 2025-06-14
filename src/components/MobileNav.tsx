import React from 'react';

const navLinks = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "cv", label: "CV", isExternal: true },
];

function MobileNav({ activeSection, onSectionChange }: { activeSection: string, onSectionChange: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void }) {
  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-[#232323] rounded-full shadow-2xl px-4 py-2 flex gap-2 border border-[#333] backdrop-blur-sm">
      {navLinks.map(link =>
        link.id === "cv" ? (
          <a
            key={link.id}
            href="Nazif-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-row items-center justify-center gap-1 px-3 py-1 rounded-full transition-all duration-200 relative outline outline-2 ${activeSection === link.id
                ? 'bg-gray-300 text-[#232323] outline-gray-300'
                : 'text-gray-300 hover:bg-[#313131] outline-transparent'
              }`}
            style={{ minWidth: 56 }}
          >
            <span className="text-xs font-semibold">CV</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </a>
        ) : (
          <button
            key={link.id}
            className={`flex flex-row items-center justify-center px-3 py-1 rounded-full transition-all duration-200 relative outline outline-2 ${activeSection === link.id
                ? 'bg-gray-300 text-[#232323] outline-gray-300'
                : 'text-gray-300 hover:bg-[#313131] outline-transparent'
              }`}
            onClick={e => onSectionChange(e, link.id)}
            style={{ minWidth: 56 }}
          >
            <span className="text-xs font-semibold">{link.label}</span>
          </button>
        )
      )}
    </nav>
  );
}

export default MobileNav;