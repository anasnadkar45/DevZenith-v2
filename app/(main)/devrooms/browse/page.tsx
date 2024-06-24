import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateRoom from "@/app/components/dev-rooms/CreateRoom";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { cn } from "@/lib/utils";
import { amaranth } from "@/app/layout";
import { DevRoomCard } from "@/app/components/dev-rooms/DevRoomCard";
import { SearchIcon } from "lucide-react";

export async function getRoomData() {
    const data = await prisma.room.findMany({
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
    })
    return data;
}

export default async function BrowsePage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser()
    const RoomData = await getRoomData()
    return (
        <div>
            <div className="w-full flex justify-between my-2">
                <h1 className={cn(amaranth.className, "text-2xl font-bold")}><span className="text-primary">Browse</span> DevRooms</h1>
                <CreateRoom />
            </div>
            <div className="flex items-center max-w-md mx-auto">
                <Input type="text" placeholder="Search for a room..." className="flex-1 mr-2" />
                <Button variant="outline" size="icon">
                    <SearchIcon className="w-5 h-5" />
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {RoomData.map((room) => (
                    <DevRoomCard
                        key={room.id}
                        id={room.id as string}
                        name={room.name}
                        tags={room.tags as [string]}
                        description={room.description as string}
                        url={room.url as string}
                        firstName={room.User?.firstName as string}
                        lastName={room.User?.lastName as string}
                        profileImage={room.User?.profileImage as string}
                    />
                ))}

            </div>
        </div>
    )
}