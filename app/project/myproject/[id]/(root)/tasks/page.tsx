// app/project/myproject/[id]/tasks/page.tsx

import AssignTask from "@/app/components/project/myproject/AssignTask";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getProjectData(id: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            ProjectMemberships: {
                select: {
                    User: {
                        select: {
                            id: true,
                            profileImage: true,
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            }
        }
    });

    return project;
}

export default async function TasksPage({ params }: { params: { id: string } }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const projectData = await getProjectData(params.id);
    const projectId = projectData?.id ?? "";
    const members = projectData?.ProjectMemberships?.map(member => member.User) ?? [];

    return (
        <div>
            {
                user ? (
                    <div>
                        <div className="flex justify-between mb-4">
                            <p className="text-2xl font-bold">Tasks</p>
                            <AssignTask projectId={projectId} members={members} />
                        </div>
                        <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full h-[60vh] ">
                            <div className="col-span-3 border rounded-lg bg-card"></div>
                            <div className="col-span-2 border rounded-lg bg-card"></div>
                            <div className="col-span-1 border rounded-lg bg-card"></div>
                        </div>
                    </div>
                ) : (
                    <Button>Login</Button>
                )
            }
        </div>
    );
}
