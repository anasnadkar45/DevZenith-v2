"use client";

import Image from "next/image";
import DotPattern from "../dot-pattern";
import { cn } from "@/lib/utils";
import { BsHeartFill } from "react-icons/bs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "../SubmitButtons";

interface MyProjectCardProps {
    id: string;
    name: string;
    logo: string | null;
    tags: [string];
    url: string;
    description: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    progress: number;
}

export function MyProjectCard({
    id,
    name,
    logo,
    tags,
    url,
    description,
    firstName,
    lastName,
    profileImage,
    progress
}: MyProjectCardProps) {
    return (
        <div className="relative flex flex-col h-full w-full overflow-hidden rounded-lg border bg-card p-3 shadow-xl">
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
                )}
            />

            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={logo || "/default-logo.png"} // Add fallback logo
                        alt={`${name} Logo`}
                        width={40}
                        height={40}
                        className="border-2 border-primary bg-primary rounded-md object-fill"
                    />
                    <div>
                        <p className="text-lg font-bold">{name}</p>
                        <p className="text-slate-400 text-xs leading-tight">
                            Created By: @{firstName} {lastName}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <BsHeartFill />
                    <p className="mb-[1px]">45</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="bg-primary/50 border animate-pulse rounded-full px-3 pb-[2px] text-xs flex items-center gap-2"
                    >
                        {tag}
                    </div>
                ))}
            </div>
            <p className="text-slate-400 line-clamp-2 mb-2 flex-grow">{description}</p>
            {/* Progress Bar */}
            <div className="w-full flex items-center gap-2 mt-2">
                <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-sm">{progress.toFixed(2)}%</div>
            </div>
            <div className="w-full flex justify-between items-center border-t pt-3 mt-auto">
                <Button className="underline" variant={"link"} onClick={() => window.open(url, '_blank')}>Github</Button>
                <Link href={`/project/myproject/${id}/dashboard`}>
                    <SubmitButton title="View Project" />
                </Link>
            </div>

        </div>
    )
}
