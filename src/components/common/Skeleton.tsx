import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-600 rounded ${className}`}
      style={{ minHeight: '1rem' }}
    />
  );
};

export const MediaCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
      <div className="relative flex-shrink-0">
        <Skeleton className="w-full h-64" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;