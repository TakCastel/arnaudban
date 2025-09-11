"use client";

export default function ProjectImageSkeleton() {
  return (
    <div className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl h-[50vh] md:h-[60vh] mx-auto rounded-2xl overflow-hidden mb-8 bg-gray-200 animate-pulse">
      <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
        {/* Effet de shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}
