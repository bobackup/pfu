export function PageHero({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="ornament-dots bg-primary-deep text-primary-foreground">
      <div className="container-site py-16 md:py-20">
        <h1 className="max-w-3xl text-3xl font-semibold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">{intro}</p>}
      </div>
      <div className="ornament-band opacity-80" aria-hidden />
    </section>
  );
}
