import { experiences } from "@/lib/data/experience";
import { ExperienceItem } from "@/components/ExperienceItem";
import { Container } from "@/components/Container";

export default function ExperiencePage() {
  return (
    <section className="section">
      <Container>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Experience</h1>
        <div className="space-y-4">
          {experiences.map((e) => (
            <ExperienceItem key={`${e.company}-${e.start}`} item={e} />
          ))}
        </div>
      </Container>
    </section>
  );
}

