"use client"
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, ArrowUpRight, Bookmark, CopyIcon, } from "lucide-react";
import copy from "copy-to-clipboard";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

interface iAppProps {
    name: string;
    id: string;
    description: string;
    url: string;
    category: string;
    image: string
}

export function ResourceCard({
    name,
    id,
    description,
    url,
    category,
    image,
}: iAppProps) {
    return (
        <div className="bg-card border-2 p-2 border-primary/25 rounded-lg min-h-[265px] relative">
            <div className="flex items-center gap-3">
                <Image
                    src={image}
                    alt="resource Image"
                    width={100}
                    height={100}
                    className="border-2 border-primary rounded-md object-fill bg-white "
                />
                <div>
                    <h1 className="xl::text-3xl text-2xl font-bold">{name}</h1>
                    <p className="text-muted-foreground text-sm">Design Inspiration </p>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild className="absolute -right-2 top-0 w-fit">
                            <Button variant="ghost" className="w-fit hover:bg-transparent" >
                                <Bookmark className="hover" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent align="start" className="absolute -right-3 top-2">
                            <p>Comming Soon</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>
            <p className="text-muted-foreground text-sm mb-2 mt-1">Description</p>
            <p className="line-clamp-2">{description}</p>
            <div className="grid grid-cols-2 gap-2 absolute bottom-2 right-2 left-2">
                <Button variant={"secondary"}
                    className="space-x-2"
                    onClick={() => {
                        copy(url);
                        toast.success("Link copied")
                    }}>
                    <p>Copy</p>
                    <CopyIcon />
                </Button>
                <Button
                    className="space-x-2"
                    onClick={() => window.open(url, '_blank')}
                >
                    <p>Visit</p>
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}