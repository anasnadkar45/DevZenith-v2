import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UpdateTaskStatus } from "./UpdateTaskStatus";

// Import date formatting (using Intl.DateTimeFormat as an example)
function formatDate(date: Date | null): string {
    if (!date) return "N/A"; // Handle null case
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

interface TaskProps {
    id: string;
    projectId: string;
    title: string;
    type: string;
    priority: string;
    status: string;
    description: string;
    date: Date | null; 
    createdAt: Date; 
}


export function TaskCard({ id, projectId, title, type, priority, status, description, date, createdAt }: TaskProps) {
    return (
        <div key={id} className="bg-card border rounded-lg p-2 my-2 space-y-2">
            <div className="flex justify-between items-center">
                <p className="font-semibold">{title}</p>
                <Edit size={20} />
            </div>
            <p className="text-sm line-clamp-1">{description}</p>
            <div className="text-xs text-slate-400">
                <p>Submission Date: {formatDate(date)}</p> 
                <p>Assigned Date: {formatDate(createdAt)}</p>
            </div>
            <UpdateTaskStatus status={status} taskId={id} projectId={projectId} />
            <Dialog>
                <DialogTrigger asChild className="hover:cursor-pointer">
                    <Button variant={"outline"} className="w-full bg-card">View Task</Button>
                </DialogTrigger>
                <DialogContent className="rounded-lg max-w-[400px] md:max-w-[650px] max-h-[800px] lg:max-w-[950px] xl:max-w-[1150px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="max-h-[200px] overflow-y-scroll">
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-3 gap-4 py-4">
                        <div className="space-y-2">
                            <DialogTitle>Status</DialogTitle>
                            <p className="p-2 border rounded-md">{status}</p>
                        </div>
                        <div className="space-y-2">
                            <DialogTitle>Priority</DialogTitle>
                            <p className="p-2 border rounded-md">{priority}</p>
                        </div>
                        <div className="space-y-2">
                            <DialogTitle>Type</DialogTitle>
                            <p className="p-2 border rounded-md">{type}</p>
                        </div>
                        <div className="space-y-2">
                            <DialogTitle>Submission Date</DialogTitle>
                            <p className="p-2 border rounded-md">{formatDate(date)}</p>
                        </div>
                        <div className="space-y-2">
                            <DialogTitle>Assigned Date</DialogTitle>
                            <p className="p-2 border rounded-md">{formatDate(createdAt)}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <UpdateTaskStatus status={status} taskId={id} projectId={projectId} />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

