"use client"
import { State, deleteProjectResource, deleteSquadPost } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface resourceProps {
    id: string;
    projectId: string;
}

function DeleteProjectResource({ id, projectId }: resourceProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(deleteProjectResource, initialState);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
            // redirect(`/squads/${squadId}`)
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);
    console.log(id)
    return (
        <form action={formAction} method="post">
            <input type="hidden" name="resourceId" value={id} />
            <input type="hidden" name="projectId" value={projectId} />
            <button type="submit" className="flex text-red-600 gap-2 items-center w-[140px]">
                <Trash size={20} />
                <p>Delete Resource</p>
            </button>
        </form>
    )
}

export default DeleteProjectResource;