export default function OverlayTitle({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-none drop-shadow">
        {title}
      </h1>
      {subtitle && <p className="text-white/80 mt-3 text-xl">{subtitle}</p>}
    </div>
  );
}
