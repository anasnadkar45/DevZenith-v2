"use server"
import prisma from "@/app/lib/db";

// Adjust the function to include pagination parameters
export async function getJobData(search: string, skip: number = 0, take: number = 3) {
    const searchWords = search.split(" ").filter(word => word);

    const data = await prisma.job.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                // {
                //     roledescription: {
                //         string_contains:search,
                //     },
                // },
                // {
                //     duration: {
                //         startsWith: search,
                //         mode: 'insensitive'
                //     }
                // },
                // {
                //     jobtype: {
                //         in: ["Contract", "FullTime", "Intern"],
                //     }
                // },
                // {
                //     location: {
                //         contains: search
                //     }
                // },
                // {
                //     role: {
                //         contains: search
                //     }
                // },
                // {
                //     batches: {
                //         hasSome: searchWords,
                //     },
                // },
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
            location: true,
            logo: true,
            batches: true,
            role: true,
            roledescription: true,
            jobtype: true,
            salary: true,
            link: true,
            duration: true,
            createdAt:true,
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
