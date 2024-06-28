"use server"
import prisma from "@/app/lib/db";

// Adjust the function to include pagination parameters
export async function getRoomData(search: string, skip: number = 0, take: number = 3) {
    const searchWords = search.split(" ").filter(word => word);

    const data = await prisma.room.findMany({
        where: {
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
        skip,
        take,
        orderBy: {
            createdAt: 'desc', // Replace 'createdAt' with the field you want to sort by
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
                },
            },
        },
    });

    return data;
}
