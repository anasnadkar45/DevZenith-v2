// /app/rooms/[id]/page.tsx
import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { DevZenithVideo } from "./video-player";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";

async function getData(id: string) {
    try {
        const data = await prisma.room.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                description: true,
                tags: true,
                url: true,
                User: {
                    select: {
                        firstName: true,
                        lastName: true,
                        profileImage: true
                    }
                }
            },
        });
        console.log("Fetched data:", data);  // Log fetched data
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }
}

interface RoomPageProps {
    params: { id: string };
}


export default async function Roompage({ params }: RoomPageProps) {
    unstable_noStore();
    const room = await getData(params.id);
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!room) {
        return (
            <div>
                <p>Room not found.</p>
            </div>
        );
    }

    const session = {
        id: user?.id as string,
        name: user?.given_name as string,
        image: user?.picture as string,
    };

    return (
        <div className="grid lg:grid-cols-4 h-[82vh] gap-4 mt-2">
            <div className="lg:col-span-3">
                <div className="border rounded-lg p-2">
                    <DevZenithVideo
                        room={room as any}
                        session={session}
                    />
                </div>
            </div>
            <div className="lg:col-span-1">
                <div className="border rounded-lg bg-card shadow-md p-2">
                    <div className="space-y-3">
                        <h1 className="text-xl font-bold">{room.name}</h1>
                        <Link href={room.url as string} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                            <GithubIcon className="w-5 h-5" />
                            <p>Github Url</p>
                        </Link>
                        <div className="flex flex-wrap gap-2">
                            {room.tags.map((tag, index) => (
                                <Badge key={index} variant={"secondary"}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <Avatar>
                            <AvatarImage src={room.User.profileImage} />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium leading-4">{room.User.firstName} {room.User.lastName}</div>
                            <div className="text-muted-foreground text-sm">Host</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
