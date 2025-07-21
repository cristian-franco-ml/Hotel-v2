import React from 'react';
interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}
const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  height,
  width
}) => {
  const heightClass = height || 'h-4';
  const widthClass = width || 'w-full';
  return <div className={`animate-pulse rounded bg-gray-200 dark:bg-gray-700/40 ${heightClass} ${widthClass} ${className}`}></div>;
};
export default Skeleton;