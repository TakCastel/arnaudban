"use client";
import React from "react";

export default function VideoPlayer({
  vimeoId,
  className = "",
}: {
  vimeoId: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full aspect-video ${className}`}>
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?background=0&autopause=1&title=0&byline=0&portrait=0`}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
