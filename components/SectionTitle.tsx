// SectionTitle.tsx
export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-blue-700 mt-3 text-lg font-medium tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
