import { DevRoomCard } from "@/app/components/dev-rooms/DevRoomCard";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getRoomData(userId: string) {
    const data = await prisma.room.findMany({
        where: {
            userId: userId
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

export default async function YourRoomsPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id as string;
    
    // Handle case where userId might be undefined
    if (!userId) {
        return <div>No user ID found.</div>;
    }
    
    const roomData = await getRoomData(userId);
    console.log(roomData);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {roomData.map((room) => (
                <DevRoomCard
                    key={room.id}
                    id={room.id}
                    name={room.name}
                    tags={room.tags as [string]} // Cast to string[]
                    description={room.description ?? "No description available"}
                    url={room.url ?? ""}
                    firstName={room.User?.firstName ?? ""}
                    lastName={room.User?.lastName ?? ""}
                    profileImage={room.User?.profileImage ?? ""}
                />
            ))}
        </div>
    );
}
