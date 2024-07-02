import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import NoSearchFound from "@/public/Search.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DotPattern from "@/app/components/dot-pattern";
import { cn } from "@/lib/utils";
import { unstable_noStore } from "next/cache";
import { UnauthorizedUser } from "@/app/components/UnauthorizedUser";
import { Suspense } from "react";

async function getData(userId: string) {
    const membershipRequests = await prisma.membershipRequest.findMany({
        where: {
            userId: userId,
            status: "ACCEPTED",
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
                    tasks: {
                        select: {
                            status: true
                        }
                    }
                }
            }
        }
    });

    return membershipRequests.map((request) => request.Project);
}

export default async function JoinedPage() {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!user) {
        // If the user is not logged in
        return (
            <UnauthorizedUser title="You have to login to access your joined projects" />
        );
    }
    const data = await getData(userId as string);

    if (!data.length) {
        return (
            <div className="w-full h-[82vh] flex flex-col justify-center items-center space-y-8">
                <Image src={NoSearchFound} alt="No projects found" className="w-[400px] mx-auto" />
                <p className="text-center font-bold text-3xl mx-auto max-w-[400px]">You have not joined any projects yet.</p>
                <div className="w-[300px] mx-auto">
                    <Link href="/project/search">
                        <Button className="w-[300px] mx-auto">Join Project</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
                {data.map((project) => {
                    const totalTasks = project?.tasks.length as number;
                    const completedTasks = project?.tasks.filter((task) => task.status === 'DONE').length as number;
                    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                    return (
                        <Link href={`/project/joined/${project?.id}/resources`} key={project?.id}>
                            <div className="relative flex flex-col h-full w-full overflow-hidden rounded-lg border bg-card p-3 shadow-xl">
                                <DotPattern
                                    className={cn(
                                        "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]"
                                    )}
                                />
                                <div className="flex items-center gap-2">
                                    <div className="flex justify-center items-center w-10 h-10 border-2 border-primary bg-primary rounded-md overflow-hidden">
                                        <Image
                                            src={project?.logo || "/default-logo.png"} // Fallback logo
                                            alt={`${project?.name} Logo`}
                                            width={40}
                                            height={40}
                                            className="object-cover" // Ensure all images have the same size
                                        />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">{project?.name}</p>
                                        <p className="text-slate-400 text-xs leading-tight">
                                            Created By: @{project?.User?.firstName} {project?.User?.lastName}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                                    {project?.tags.map((tag, index) => (
                                        <div key={index} className="bg-primary/50 border animate-pulse rounded-full px-3 pb-[2px] text-xs flex items-center gap-2">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-slate-400 line-clamp-2 mb-2 flex-grow">{project?.description}</p>
                                <div className="w-full flex items-center gap-2">
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div className="bg-primary h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                                    </div>
                                    <div className="text-sm">{progressPercentage.toFixed(2)}%</div>
                                </div>
                                <div className="w-full items-center border-t pt-3 mt-auto">
                                    <a href={project?.url} target="_blank" rel="noopener noreferrer" className="underline text-primary">
                                        Github
                                    </a>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </Suspense>
    );
}
