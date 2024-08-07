import { UnauthorizedUser } from "@/app/components/UnauthorizedUser";
import { SearchBar } from "@/app/components/dev-rooms/SearchBar";
import CreateProject from "@/app/components/form/CreateProject";
import { MyProjectCard } from "@/app/components/project/MyProjectCard";
import { amaranth } from "@/app/layout";
import prisma from "@/app/lib/db";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
async function getData(userId: string) {
    const data = await prisma.project.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            name: true,
            description: true,
            logo: true,
            tags: true,
            url: true,
            tasks: {
                select: {
                    status: true,
                }
            },
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                }
            },
            createdAt: true,
        }
    });

    return data;
}

export default async function MyProject() {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;
    if (!user) {
        // If the user is not logged in
        return (
            <UnauthorizedUser title="You have to login to access your projects" />
        );
    }
    const data = await getData(userId as string);

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            <div className="w-full flex justify-between my-2">
                <h1 className={cn(amaranth.className, "text-2xl font-bold")}><span className="text-primary">Your</span> Project</h1>
                <CreateProject />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
                {data.map((project) => {
                    const totalTasks = project.tasks.length;
                    const completedTasks = project.tasks.filter(task => task.status === 'DONE').length;
                    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                    return (
                        <MyProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            tags={project.tags as [string]}
                            description={project.description}
                            logo={project.logo || "/default-logo.png"}
                            url={project.url}
                            firstName={project.User?.firstName as string}
                            lastName={project.User?.lastName as string}
                            profileImage={project.User?.profileImage as string}
                            progress={progressPercentage as number} // Pass progress here
                        />
                    );
                })}
            </div>
        </Suspense>
    );
}
