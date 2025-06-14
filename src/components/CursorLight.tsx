import React, { useEffect, useRef } from 'react';

function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-[9999] hidden sm:block"
      style={{
        width: 260,
        height: 260,
        borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.04) 60%,rgba(255,255,255,0) 100%)',
        filter: 'blur(28px)',
        transition: 'background 0.2s,filter 0.2s',
        left: 0,
        top: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

export default CursorLight;