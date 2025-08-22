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
    <div className="mb-12">
      <h2 
        id={id}
        className="text-4xl md:text-5xl font-extrabold text-text leading-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-text/80 mt-3 text-lg font-medium tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
