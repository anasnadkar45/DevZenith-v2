
import prisma from "@/app/lib/db";

export async function getRoomData(userId: string, search: string) {
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
