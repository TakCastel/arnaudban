// SectionTitle.tsx
export default function SectionTitle({
  title,
  subtitle,
  id,
}: {
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div className="sticky top-[72px] z-10 mb-8 bg-background/95 backdrop-blur-sm py-0 -mx-8 px-8">
      <h2 
        id={id}
        className="text-5xl md:text-7xl font-extrabold text-foreground leading-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-foreground/80 mt-3 text-lg font-medium tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
