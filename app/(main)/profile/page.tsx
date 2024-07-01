import { SquadCard } from "@/app/components/SquadCard";
import { SettingsForm } from "@/app/components/profile/SettingsForm";
import { MyProjectCard } from "@/app/components/project/MyProjectCard";
import { amaranth } from "@/app/layout";
import prisma from "@/app/lib/db";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
        },
    });

    return data;
}

async function getProject(userId: string) {
    const data = await prisma.project.findMany({
        where: {
            userId: userId,
        },
        take: 4,
        orderBy: {
            updatedAt: "desc"
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
        }
    })
    return data;
}

async function getSquad(userId: string) {
    return prisma.squad.findMany({
        where: {
            userId: userId,
        },
        take: 3,
        orderBy: {
            updatedAt: "desc"
        },
        select: {
            id: true,
            name: true,
            username: true,
            image: true,
            description: true,
            createdAt: true,
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                },
            },
        },
    });
}
export default async function SetttingsPage() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        throw new Error("Not Authorized");
    }
    const data = await getData(user.id);
    const projectData = await getProject(user.id)
    const squadData = await getSquad(user.id)
    return (
        <section className=" space-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                <Card className="col-span-1">
                    <SettingsForm
                        firstName={data?.firstName as string}
                        lastName={data?.lastName as string}
                        email={data?.email as string}
                    />
                </Card>
                <Card className="col-span-1 lg:col-span-3 p-6">
                    <CardTitle className="text-2xl font-bold mb-2">Recent Projects</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {projectData.map((project) => {
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
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                <Card className="col-span-4 p-6">
                    <CardTitle className="text-2xl font-bold mb-2">Recent Projects</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {squadData.map((squad) => (
                            <SquadCard
                                key={squad.id}
                                id={squad.username}
                                name={squad.name}
                                image={squad.image}
                                description={squad.description}
                                createdAt={squad.createdAt}
                                username={squad.username}
                                User={squad.User} // Pass User, which can be null
                            />
                        ))}
                    </div>
                </Card>
            </div>

        </section>
    );
}