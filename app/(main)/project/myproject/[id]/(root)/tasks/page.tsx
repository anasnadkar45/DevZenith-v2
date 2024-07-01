// app/project/myproject/[id]/tasks/page.tsx

import { TaskPage } from '@/app/components/project/joined/TaskPage';
import AssignTask from '@/app/components/project/myproject/AssignTask';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { unstable_noStore } from 'next/cache';

interface Task {
    id: string;
    title: string;
    priority: string;
    status: string;
    User: {
        firstName: string;
        lastName: string;
        profileImage: string;
    } | null;
}

interface ProjectMembership {
    User: {
        id: string;
        profileImage: string;
        firstName: string;
        lastName: string;
    } | null;
}

interface ProjectData {
    id: string;
    tasks: Task[];
    ProjectMemberships: ProjectMembership[];
}


async function getProjectData(id: string): Promise<ProjectData | null> {
    const project = await prisma.project.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            tasks: {
                select: {
                    id: true,
                    title: true,
                    priority: true,
                    status: true,
                    User: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profileImage: true,
                        },
                    },
                },
            },
            ProjectMemberships: {
                select: {
                    User: {
                        select: {
                            id: true,
                            profileImage: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            },
        },
    });

    return project;
}

export default async function TasksPage({ params }: { params: { id: string } }) {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const projectData = await getProjectData(params.id);

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between mb-2">
                <p className="text-2xl font-bold">Tasks</p>
                <AssignTask projectId={projectData?.id ?? ''} members={projectData?.ProjectMemberships?.map(member => member.User) ?? []} />
            </div>
            <TaskPage projectData={projectData} />
        </div>
    );
}
