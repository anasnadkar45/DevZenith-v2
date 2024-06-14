"use client"

import Image from "next/image";

interface iAppProps {
    id: string;
    name: string;
    logo: string | null;
    tags: [string];
    url: string;
    firstName: string;
    lastName: string;
    profileImage: string;
}
export function ProjectCard({
    id,
    name,
    logo,
    tags,
    url,
    firstName,
    lastName,
    profileImage
}: iAppProps) {
    return (
        <div className="min-h-[300px] rounded-lg bg-card py-3 px-4 border">
            <div className="flex gap-2">
                <Image src={logo as string} alt="" width={70} height={70} className="border rounded-lg" />
                <div>
                    <p className="text-lg font-bold">{name}</p>
                    <div className="flex flex-wrap gap-2 mt-2 w-[300px]">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-primary/50 border border-primary animate-pulse rounded-full px-3 pb-[2px] text-sm flex items-center gap-2"
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}