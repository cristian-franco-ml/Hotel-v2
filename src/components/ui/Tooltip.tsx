import React, { useState, useRef, cloneElement } from 'react';
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
}
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2';
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default:
        return 'bottom-full mb-2';
    }
  };
  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 -translate-x-1/2 border-t-gray-800 border-t-8 border-x-transparent border-x-8 border-b-0';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 border-b-8 border-x-transparent border-x-8 border-t-0';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-l-gray-800 border-l-8 border-y-transparent border-y-8 border-r-0';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-r-gray-800 border-r-8 border-y-transparent border-y-8 border-l-0';
      default:
        return 'top-full left-1/2 -translate-x-1/2 border-t-gray-800 border-t-8 border-x-transparent border-x-8 border-b-0';
    }
  };
  const handleMouseEnter = () => {
    setIsVisible(true);
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  return <div className="relative inline-block">
      {cloneElement(children, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    })}
      {isVisible && <div ref={tooltipRef} className={`absolute z-50 ${getPositionClasses()} w-max max-w-xs`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
      pointerEvents: 'auto'
    }}>
          <div className="bg-gray-800 text-white text-xs rounded-md p-2 shadow-lg">
            {content}
          </div>
          <div className={`absolute h-0 w-0 border-solid ${getArrowClasses()}`}></div>
        </div>}
    </div>;
};
export default Tooltip;