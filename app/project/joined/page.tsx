// "use client"
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image";
import { Key } from "react";

export async function getData(userId: string ) {
    const membershipRequests = await prisma.membershipRequest.findMany({
        where: {
            userId: userId,
            status: "ACCEPTED"
        },
        select: {
            Project: {
                select: {
                    id: true, 
                    name: true,
                    description: true,
                    logo: true,
                    tags: true,
                    url: true,
                    User: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profileImage: true,
                        }
                    },
                    createdAt: true,
                }
            }
        }
    });

    // Flatten the structure to get the projects directly
    // return membershipRequests.map(request => request.Project);
    return membershipRequests;
}

export default async function JoinedPage() {
    const { getUser } = getKindeServerSession()
    const user = await getUser();
    const userId = user?.id
    const data = await getData(userId as string);
    console.log(data);

    if (!userId) {
        return <p>Please log in to see your joined projects.</p>;
    }

    if (!data.length) {
        return <p>You have not joined any projects yet.</p>;
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
            
            {data.map((project) => (
                <div key={project.Project?.name} className="relative flex flex-col h-full w-full overflow-hidden rounded-lg border bg-card p-3 shadow-xl">
                    <div className="flex items-center gap-2">
                        <Image src={project.Project?.logo as string} alt="" width={40} height={40} className="border-2 border-primary bg-primary rounded-md object-fill" />
                        <div>
                            <p className="text-lg font-bold">{project.Project?.name}</p>
                            <p className="text-slate-400 text-xs leading-tight">
                                Created By: @{project.Project?.User?.firstName} {project.Project?.User?.lastName}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 mb-2">
                        {project.Project?.tags.map((tag: string , index: Key) => (
                            <div key={index} className="bg-primary/50 border animate-pulse rounded-full px-3 pb-[2px] text-xs flex items-center gap-2">
                                {tag}
                            </div>
                        ))}
                    </div>
                    <p className="text-slate-400 line-clamp-2 mb-2 flex-grow">{project.Project?.description}</p>
                    <div className="w-full flex justify-between items-center border-t pt-3 mt-auto">
                        <a href={project.Project?.url} target="_blank" rel="noopener noreferrer" className="underline text-primary">
                            Github
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}