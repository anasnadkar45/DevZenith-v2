"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import {  State, createMembershipRequest } from "@/app/actions";
import { useFormState } from "react-dom";

interface iAppProps {
    projectId: string;
    status: string;
}

export function JoinRequest({ projectId, status }: iAppProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(createMembershipRequest, initialState);
    const ref = useRef<HTMLFormElement>(null);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    const getButtonText = () => {
        switch (status) {
            case "PENDING":
                return "Pending";
            case "ACCEPTED":
                return "Accepted";
            case "REJECTED":
                return "Rejected";
            default:
                return "Join";
        }
    };

    return (
        <form action={formAction}>
            <input type="hidden" name="projectId" value={projectId} />
            <Button className="rounded-full gap-2" disabled={status === "PENDING" || status === "ACCEPTED"}>
                <p>{getButtonText()}</p>
                <ArrowUpRight size={20} />
            </Button>
        </form>
    )
}
