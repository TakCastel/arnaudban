"use client";

export default function HeroSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="w-[90vw] h-[calc(100vh-5rem)] mx-auto sticky top-20"
      style={{
        marginBottom: '5vw'
      }}
    >
      <div className="w-full h-full pb-[5vw]">
        <img
          src="https://picsum.photos/1600/900"
          alt="Hero background"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </section>
  );
}
