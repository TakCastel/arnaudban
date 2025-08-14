// SectionTitle.tsx
export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-4xl md:text-5xl font-extrabold">{title}</h2>
      {subtitle && <p className="text-brand-blue mt-2">{subtitle}</p>}
    </div>
  );
}
