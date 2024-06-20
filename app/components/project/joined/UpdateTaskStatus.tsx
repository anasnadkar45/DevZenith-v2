"use client"
import { updateTaskStatus } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { FormEvent, useEffect } from "react";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

interface StatusProps {
    status: string;
    taskId: string;
    projectId: string;
}

export function UpdateTaskStatus({ status, taskId , projectId }: StatusProps) {
    const initialState = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateTaskStatus, initialState);

    const handleSubmit = (e: FormEvent<HTMLFormElement>, newStatus: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('status', newStatus); 
        formData.set('taskId', taskId); 
        formData.set('projectId', projectId);
        formAction(formData);
    };

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <div className="grid grid-cols-3 gap-1">
            <form onSubmit={(e) => {
                handleSubmit(e, 'TODO')}}>
                <Button size={"sm"} variant={"secondary"} className="w-full text-xs" type="submit">TODO</Button>
            </form>
            <form onSubmit={(e) => handleSubmit(e, 'IN_PROGRESS')}>
                <Button size={"sm"} variant={"secondary"} className="w-full text-xs" type="submit">IN_PROGRESS</Button>
            </form>
            <form onSubmit={(e) => handleSubmit(e, 'DONE')}>
                <Button size={"sm"} variant={"secondary"} className="w-full text-xs" type="submit">DONE</Button>
            </form>
        </div>
    );
}
