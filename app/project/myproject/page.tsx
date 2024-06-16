import { MyProjectCard } from "@/app/components/project/MyProjectCard";
import { ProjectCard } from "@/app/components/project/ProjectCard";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

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

    // Flatten the structure to get the projects directly
    // return membershipRequests.map(request => request.Project);
    return data;
}

export default async function MyProject() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;
    const data = await getData(userId as string);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
            {data.map((project) => (
                <MyProjectCard
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    tags={project.tags as [string]}
                    description={project.description}
                    logo={project.logo}
                    url={project.url}
                    firstName={project.User?.firstName as string}
                    lastName={project.User?.lastName as string}
                    profileImage={project.User?.profileImage as string}
                    // status={project.membershipRequestStatus as string}
                />
            ))}
        </div>
    )
}