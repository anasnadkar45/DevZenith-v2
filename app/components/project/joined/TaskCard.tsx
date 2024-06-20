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
import { UpdateTaskStatus } from "./UpdateTaskStatus";
interface TaskProps {
    id: string;
    projectId: string;
    title: string;
    type: string;
    priority: string;
    status: string;
    // date: Date | undefined;
    description: string;
    // createdAt: string | undefined;
}
export function TaskCard({ id, projectId, title, type, priority, status, description }: TaskProps) {
    return (
        <div key={id} className="bg-card border rounded-lg p-2 my-2 space-y-2">
            <div className="flex justify-between items-center">
                <p className="font-semibold">{title}</p>
                <Edit size={20} />
            </div>
            <p className="text-sm">{description}</p>
            <UpdateTaskStatus status={status} taskId={id} projectId={projectId} />
            <Dialog>
                <DialogTrigger asChild className="hover:cursor-pointer">
                    <Button className="w-full">View Task</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[425px] lg:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
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
        </div>

    )
}