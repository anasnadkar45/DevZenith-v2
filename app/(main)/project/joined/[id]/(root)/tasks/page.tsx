import { UpdateTaskStatus } from "@/app/components/project/joined/UpdateTaskStatus";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TaskCard } from "@/app/components/project/joined/TaskCard";
import { unstable_noStore } from "next/cache";

export async function getTaskData(userId: string, projectId: string) {
    const data = await prisma.task.findMany({
        where: {
            userId: userId,
            projectId: projectId,
        },
        select: {
            id: true,
            title: true,
            type: true,
            priority: true,
            date: true,
            status: true,
            description: true,
            createdAt: true,
        }
    });
    return data;
}

export default async function TaskPage({
    params,
}: {
    params: { id: string }
}) {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id as string;
    const taskData = await getTaskData(userId, params.id);
    const projectId = params.id;

    const todoTasks = taskData.filter(task => task.status === "TODO")
    const inProgressTasks = taskData.filter(task => task.status === "IN_PROGRESS")
    const doneTasks = taskData.filter(task => task.status === "DONE")
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
            <div className="border rounded-lg p-2">
                <h2 className="text-lg font-bold">Not Started</h2>
                {todoTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        projectId={projectId}
                        title={task.title}
                        type={task.type}
                        priority={task.priority}
                        status={task.status}
                        description={task.description}
                        date={task.date ? new Date(task.date) : null} // Ensure date is Date or null
                        createdAt={new Date(task.createdAt)} // Ensure createdAt is Date
                    />
                ))}
            </div>
            <div className="border rounded-lg p-2">
                <h2 className="text-lg font-bold">In Progress</h2>
                {inProgressTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        projectId={projectId}
                        title={task.title}
                        type={task.type}
                        priority={task.priority}
                        status={task.status}
                        description={task.description}
                        date={task.date ? new Date(task.date) : null} // Ensure date is Date or null
                        createdAt={new Date(task.createdAt)} // Ensure createdAt is Date
                    />
                ))}
            </div>
            <div className="border rounded-lg p-2">
                <h2 className="text-lg font-bold">Done</h2>
                {doneTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        projectId={projectId}
                        title={task.title}
                        type={task.type}
                        priority={task.priority}
                        status={task.status}
                        description={task.description}
                        date={task.date ? new Date(task.date) : null} // Ensure date is Date or null
                        createdAt={new Date(task.createdAt)} // Ensure createdAt is Date
                    />
                ))}
            </div>
        </div>
    );
}
