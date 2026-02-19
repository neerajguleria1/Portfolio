import { useEffect, useState } from 'react';

export default function MagneticCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-10 h-10 border-2 border-white rounded-full transition-all duration-200 ${
            isPointer ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>
      <div
        className="fixed pointer-events-none z-50 bg-white rounded-full mix-blend-difference transition-all duration-500"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          width: isPointer ? '6px' : '4px',
          height: isPointer ? '6px' : '4px',
        }}
      />
    </>
  );
}
