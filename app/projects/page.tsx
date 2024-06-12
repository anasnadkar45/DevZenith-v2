import { ProjectCard } from "../components/ProjectCard";

export default async function ProjectsPage() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
            <div className=" lg:col-span-2 gap-3">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
            <div className="col-span-1">
                popular
            </div>
        </section>
    );
}