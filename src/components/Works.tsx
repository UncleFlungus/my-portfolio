import { ProjectRow } from "./Project";
import { projects } from "./projects";
import { Enso } from "./Enso";

export function Works() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-6xl px-6 py-28 md:py-40"
    >
      <header className="mb-20 flex items-center gap-4">
        <Enso variant="mark" size={26} animate={false} />
        <h2 className="font-[Fraunces] text-[clamp(28px,4vw,40px)] font-light text-[#1c1812]">
          selected work
        </h2>
      </header>

      <div className="flex flex-col gap-28 md:gap-40">
        {projects.map((p, i) => (
          <ProjectRow key={p.title} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
