interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--coffee-gold)]">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl leading-tight text-[var(--coffee-ink)] sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--coffee-muted)]">{description}</p> : null}
    </div>
  );
}
