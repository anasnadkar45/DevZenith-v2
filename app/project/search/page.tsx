import CreateProject from "@/app/components/form/CreateProject";
import { ProjectCard } from "@/app/components/project/ProjectCard";
import prisma from "@/app/lib/db";
import { Input } from "@/components/ui/input";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BiSearch } from "react-icons/bi";

async function getData(userId: string | undefined) {
    const data = await prisma.project.findMany({
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
            MembershipRequests: {
                where: {
                    userId: userId
                },
                select: {
                    status: true,
                }
            },
            createdAt: true,
        }
    });

    return data.map(project => ({
        ...project,
        membershipRequestStatus: project.MembershipRequests.length > 0
            ? project.MembershipRequests[0].status
            : null
    }));
}


export default async function SearchPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    const data = await getData(userId);

    return (
        <div className="mt-2">
            <div className="w-full flex flex-wrap justify-between gap-2">
                <div className="flex">
                    <h1 className="text-2xl font-bold"><span className="text-primary font-bold">Search</span> Project's</h1>
                </div>

                <div className="relative w-[70%]">
                    <BiSearch className="absolute left-2.5 top-[9px] h-6 w-6 mr-3 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full  rounded-lg bg-background pl-10"
                    />
                </div>
                <CreateProject />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
                {data.map((project) => (
                    <ProjectCard
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
                        status={project.membershipRequestStatus as string}
                    />
                ))}
            </div>
        </div>
    )
}