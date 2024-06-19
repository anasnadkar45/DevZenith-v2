import { ProjectNav } from "../../components/ProjectNav";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <ProjectNav />
            {children}
        </div>
    );
}
