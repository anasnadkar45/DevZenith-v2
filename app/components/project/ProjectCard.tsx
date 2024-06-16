"use client";

import Image from "next/image";
import DotPattern from "../dot-pattern";
import { cn } from "@/lib/utils";
import { BsHeartFill } from "react-icons/bs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { JoinRequest } from "./JoinRequest";

interface iAppProps {
    id: string;
    name: string;
    logo: string | null;
    tags: [string];
    url: string;
    description: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    status: string;
}

export function ProjectCard({
    id,
    name,
    logo,
    tags,
    url,
    description,
    firstName,
    lastName,
    profileImage,
    status
}: iAppProps) {
    return (
        <div className="relative flex flex-col h-full w-full overflow-hidden rounded-lg border bg-card p-3 shadow-xl">
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
                )}
            />

            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Image src={logo as string} alt="" width={40} height={40}
                        className="border-2 border-primary bg-primary rounded-md object-fill"
                    />
                    <div>
                        <p className="text-lg font-bold">{name}</p>
                        <p className="text-slate-400 text-xs leading-tight ">Created By :- @{firstName}{lastName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <BsHeartFill />
                    <p className="mb-[1px]">45</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
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
            <div className="w-full flex justify-between items-center border-t pt-3">
                <Button className="underline" variant={"link"} onClick={() => window.open(url, '_blank')}>Github</Button>
                <JoinRequest projectId={id} status={status} />
            </div>
        </div>
    )
}
