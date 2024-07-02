import { UnauthorizedUser } from "@/app/components/UnauthorizedUser";
import CreateRoom from "@/app/components/dev-rooms/CreateRoom";
import { SearchBar } from "@/app/components/dev-rooms/SearchBar";
import { YourDevRoomCard } from "@/app/components/dev-rooms/YourDevRoomCard";
import { amaranth } from "@/app/layout";
import prisma from "@/app/lib/db";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";

async function getRoomData(userId: string, search: string) {
    // Split the search term by spaces to allow multi-word searches.
    const searchWords = search.split(" ").filter(word => word);
    const data = await prisma.room.findMany({
        where: {
            userId: userId,
            OR: [

                {
                    name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    tags: {
                        hasSome: searchWords,
                    },
                },
            ],
        },
        select: {
            id: true,
            name: true,
            description: true,
            url: true,
            tags: true,
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                }
            }
        }
    });
    return data;
}

export default async function YourRoomsPage({
    params,
}: {
    params: {
        search: string;
    };
}) {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id as string;

    // Handle case where userId might be undefined
    if (!user) {
        // If the user is not logged in
        return (
            <UnauthorizedUser title="You have login to get access to Your Rooms." />
        );
    }

    const roomData = await getRoomData(userId, params.search || "");

    return (
        <div className="space-y-2">
            <div className="w-full flex justify-between my-2">
                <h1 className={cn(amaranth.className, "text-2xl font-bold")}><span className="text-primary">Your</span> DevRooms</h1>
                <CreateRoom />
            </div>
            {/* <SearchBar /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <Suspense fallback={<p>Loading feed...</p>}>
                    {roomData.map((room) => (
                        <YourDevRoomCard
                            key={room.id}
                            id={room.id}
                            name={room.name}
                            tags={room.tags} // Cast to string[]
                            description={room.description ?? ""}
                            url={room.url ?? ""}
                        />
                    ))}
                </Suspense>
            </div>
        </div>

    );
}
