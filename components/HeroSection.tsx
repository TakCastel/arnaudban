"use client";

export default function HeroSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="w-[90vw] h-[90vh] mx-auto rounded-2xl overflow-hidden"
    >
      <img
        src="https://picsum.photos/1600/900"
        alt="Hero background"
        className="w-full h-full object-cover"
      />
    </section>
  );
}
