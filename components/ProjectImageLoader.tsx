"use client";

export default function ProjectImageLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl">
      {/* Rond qui tourne avec CSS keyframes */}
      <div
        className="w-8 h-8 md:w-10 md:h-10 border-2 border-gray-200 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"
      />
    </div>
  );
}
