"use client";
import OverlayTitle from "./OverlayTitle";
import CursorHover from "./CursorHover";

export default function HeroSection({ id }: { id?: string }) {
  return (
    <section id={id} className="relative h-[85vh] min-h-[560px]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        playsInline
        loop
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <CursorHover />
      <OverlayTitle
        title="Arnaud Ban"
        subtitle="Director / Editor"
        className="absolute bottom-12 left-8 right-8"
      />
    </section>
  );
}
