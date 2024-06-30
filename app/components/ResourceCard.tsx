"use client"
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, ArrowUpRight, Bookmark, CopyIcon, Trash, } from "lucide-react";
import copy from "copy-to-clipboard";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { State, deleteResource } from "../actions";
import { unstable_noStore } from "next/cache";

export interface iResourceProps {
    name: string;
    id: string;
    description: string;
    url: string;
    category: string;
    image: string;
    User: {
        id: string,
        role: string,
    } | null,
}

interface Prop {
    resource: iResourceProps;
    index: number;
}

export function ResourceCard({
    resource
}: Prop) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(deleteResource, initialState);
    unstable_noStore()
    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);
    return (
        <div className="bg-card border-2 p-2 shadow-xl z-[1px] border-primary/25 rounded-lg min-h-[265px] relative">
            <div className="flex items-center gap-3">
                <Image
                    src={resource.image}
                    alt="resource Image"
                    width={100}
                    height={100}
                    className="border-2 border-primary rounded-md object-fill bg-white "
                />
                <div>
                    <h1 className="xl::text-3xl text-2xl font-bold">{resource.name}</h1>
                    {/* <p className="text-muted-foreground text-sm">Design Inspiration </p> */}
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
                {

                }
                <form action={formAction}>
                    <input type="hidden" name="resourceId" value={resource.id} />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild className="absolute right-8 top-0 w-fit">
                                <Button variant="ghost" size={"icon"} className="w-fit hover:bg-transparent" >
                                    <Trash className="hover" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent align="start" className="absolute -right-3 top-2">
                                <p>Delete</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </form>

            </div>
            <p className="text-muted-foreground text-sm mb-2 mt-1">Description</p>
            <p className="line-clamp-2">{resource.description}</p>
            <div className="grid grid-cols-2 gap-2 absolute bottom-2 right-2 left-2">
                <Button variant={"secondary"}
                    className="flex justify-between"
                    onClick={() => {
                        copy(resource.url);
                        toast.success("Link copied")
                    }}>
                    <p>Copy</p>
                    <CopyIcon />
                </Button>
                <Button
                    className="flex justify-between"
                    onClick={() => window.open(resource.url, '_blank')}
                >
                    <p>Visit</p>
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}