import { ProjectCard } from "../components/ProjectCard";

export default async function ProjectsPage() {
    return (
        <section className="w-full flex gap-3">
            <div className="w-full grid grid-cols-2 gap-3">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
            <div className="w-[400px]">
                popular
            </div>
        </section>
    );
}