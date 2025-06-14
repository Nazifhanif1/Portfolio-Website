import React, { useEffect, useRef, useState } from 'react';
import ContentPanel from './components/ContentPanel';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';
import CursorLight from './components/CursorLight';
import ContactLinks from './components/ContactLinks';

function App() {
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('experience');
  const [expandedImg, setExpandedImg] = useState<string | null>(null);

  const handleSectionChange = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
  };

  return (
    <div className="relative min-h-screen bg-[#161616]">
      <CursorLight />
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
      <div className="w-full min-h-screen bg-[#161616] flex flex-col md:flex-row">
        <div className="w-full md:w-[35%] md:h-[75%] p-4 md:p-8 flex flex-col items-center justify-between md:fixed md:inset-y-0 md:left-0 md:w-[35%] md:h-auto md:justify-center md:top-1/2 md:-translate-y-1/2 md:gap-12">
          <div className="flex flex-col justify-center items-center mt-4 md:mt-0">
            <span className="text-center font-russo font-normal text-white text-2xl md:text-3xl uppercase">
              Nazif Mohamed Hanif
            </span>
            <span className="font-russo text-gray-400 text-base md:text-lg">(Frontend, Web, CRO) Developer</span>
          </div>
          <DesktopNav activeSection={activeSection} onSectionChange={handleSectionChange} />
          <ContactLinks />
        </div>
        <ContentPanel
          activeSection={activeSection}
          hoveredCardIdx={hoveredCardIdx}
          setHoveredCardIdx={setHoveredCardIdx}
          setExpandedImg={setExpandedImg}
        />
        <MobileNav activeSection={activeSection} onSectionChange={handleSectionChange} />
      </div>
    </div>
  );
}

export default App;
