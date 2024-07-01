"use client"
import { State, deleteMeeting} from "@/app/actions";
import { Trash } from "lucide-react";
import { useEffect} from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface resourceProps {
    id: string;
    projectId: string;
}

export function DeleteProjectMeeting({ id, projectId }: resourceProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(deleteMeeting, initialState);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);
    console.log(id)
    return (
        <form action={formAction} method="post">
            <input type="hidden" name="meetingId" value={id} />
            <input type="hidden" name="projectId" value={projectId} />
            <button type="submit" className="text-red-600">
                <Trash size={20} />
            </button>
        </form>
    )
}