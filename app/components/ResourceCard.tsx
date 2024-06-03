import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Copy } from "lucide-react";
import Image from "next/image";

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
        <div className="border-2 p-2 border-primary/25 rounded-lg min-h-[250px] relative">
            <div className="flex items-center gap-3">
                <Image
                    src={image}
                    alt="resource Image"
                    width={100}
                    height={100}
                    className="border-2 border-primary rounded-md bg-white "
                />
                <div>
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="text-muted-foreground text-sm">Design Inspiration </p>
                </div>

            </div>
            <p className="text-muted-foreground text-sm mb-3">Description</p>
            <p className="line-clamp-2">{description}</p>
            <div className="grid grid-cols-2 gap-2 absolute bottom-2 right-2 left-2">
                <Button variant={"secondary"} className="space-x-2">
                    <p>Copy</p>
                    <Copy />
                </Button>
                <Button variant={"secondary"} className="space-x-2">
                    <p>Visit</p>
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}