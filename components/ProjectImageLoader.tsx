"use client";

export default function ProjectImageLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100/50 rounded-2xl">
      {/* Rond qui tourne avec CSS keyframes */}
      <div
        className="w-8 h-8 md:w-10 md:h-10 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"
      />
    </div>
  );
}
