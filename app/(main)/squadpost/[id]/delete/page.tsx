"use client"
import { State, deleteSquad } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface squadProps {
    id: string;
}

export function DeleteSquad({ id }: squadProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(deleteSquad, initialState);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
            redirect('/squads')
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);
    console.log(id)
    return (
        <form action={formAction} method="post">
            <input type="hidden" name="squadId" value={id} />
            <Button type="submit" variant={"destructive"} size={"sm"} className="flex gap-2 items-center w-full">
                <p>Delete</p>
                <Trash />
            </Button>
        </form>
    )
}