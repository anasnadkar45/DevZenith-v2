"use server"
import prisma from "@/app/lib/db";
import { type CategoryTypes } from "@prisma/client";

export async function getResourceData(category: string, skip: number = 0, take: number = 3) {
    const whereClause = category === "all" ? {} : { category: category as CategoryTypes };

    const data = await prisma.resource.findMany({
        where: whereClause,
        skip,  // Use the skip parameter for pagination
        take,  // Use the take parameter to limit results
        select: {
            id: true,
            image: true,
            description: true,
            name: true,
            url: true,
            category: true,
            User:{
                select:{
                    role:true,
                    id:true,
                }
            }
        },
    });

    return data;
}


