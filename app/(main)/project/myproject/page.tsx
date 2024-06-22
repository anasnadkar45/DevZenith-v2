import { MyProjectCard } from "@/app/components/project/MyProjectCard";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getData(userId: string) {
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
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;
    const data = await getData(userId as string);

    return (
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
    );
}
