// app/project/search/SearchPageClient.tsx
"use client";

import { Key, useState } from "react";
import { BiSearch } from "react-icons/bi";
import CreateProject from "@/app/components/form/CreateProject";
import { ProjectCard } from "@/app/components/project/ProjectCard";
import { Input } from "@/components/ui/input";

export default function SearchPageClient({ projects } : any) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter projects based on search query
    const filteredProjects = projects.filter((project: { name: string; description: string; tags: any[]; User: { firstName: any; lastName: any; }; }) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
        || project.description.toLowerCase().includes(searchQuery.toLowerCase())
        || project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        || `${project.User.firstName} ${project.User.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-2">
            <div className="w-full flex flex-wrap justify-between gap-2">
                <div className="flex">
                    <h1 className="text-2xl font-bold"><span className="text-primary font-bold">Search</span> Projects</h1>
                </div>

                <div className="relative w-[70%]">
                    <BiSearch className="absolute left-2.5 top-[9px] h-6 w-6 mr-3 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <CreateProject />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
                {filteredProjects.map((project: { id: Key | null | undefined; name: string; tags: [string]; description: string; logo: string | null; url: string; User: { firstName: string; lastName: string; profileImage: string; }; membershipRequestStatus: string; }) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id as string}
                        name={project.name}
                        tags={project.tags as [string]}
                        description={project.description}
                        logo={project.logo}
                        url={project.url}
                        firstName={project.User?.firstName as string}
                        lastName={project.User?.lastName as string}
                        profileImage={project.User?.profileImage as string}
                        status={project.membershipRequestStatus as string}
                    />
                ))}
            </div>
        </div>
    );
}
