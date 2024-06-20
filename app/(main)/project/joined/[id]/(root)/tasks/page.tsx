import { UpdateTaskStatus } from "@/app/components/project/joined/UpdateTaskStatus";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

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
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id as string;
    const taskData = await getTaskData(userId, params.id);

    const todoTasks = taskData.filter(task => task.status === "TODO")
    const inProgressTasks = taskData.filter(task => task.status === "IN_PROGRESS")
    const doneTasks = taskData.filter(task => task.status === "DONE")
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-2">
                <h2 className="text-lg font-bold">Not Started</h2>
                {todoTasks.map(task => (
                    <Dialog>
                        <DialogTrigger asChild>
                            <div key={task.id} className="bg-card border rounded-lg p-2 my-2 space-y-2">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{task.title}</p>
                                    <Edit size={20} />
                                </div>
                                <p className="text-sm">{task.description}</p>
                                <UpdateTaskStatus status={task.status} taskId={task.id} projectId={params.id} />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        defaultValue="Pedro Duarte"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        defaultValue="@peduarte"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                ))}
            </div>
            <div className="border rounded-lg p-2">
                <h2 className="text-lg font-bold">In Progress</h2>
                {inProgressTasks.map(task => (
                    <div key={task.id} className="bg-card border rounded-lg p-2 my-2">
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm">{task.description}</p>
                        <UpdateTaskStatus status={task.status} taskId={task.id} projectId={params.id} />
                    </div>
                ))}
            </div>
            <div className="border rounded-lg p-2">
                <h2 className="text-lg font-bold">Done</h2>
                {doneTasks.map(task => (
                    <div key={task.id} className="bg-card border rounded-lg p-2 my-2">
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm">{task.description}</p>
                        <UpdateTaskStatus status={task.status} taskId={task.id} projectId={params.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}
