import React from 'react';
import Skeleton from './Skeleton';

const DetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Skeleton className="w-full h-[500px] rounded-lg" />
          <Skeleton className="w-full h-10 mt-4 rounded" />
        </div>

        <div className="md:w-2/3">
          <Skeleton className="h-10 w-3/4 mb-4" />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <Skeleton className="h-6 w-24 mb-2" />
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-6 w-20 rounded-full" />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-6 w-24 mb-2" />
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;