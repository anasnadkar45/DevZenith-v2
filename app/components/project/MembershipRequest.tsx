"use client";
import { State, updateMembershipRequest } from "@/app/actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface iAppProps {
    id: string;
    status: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
}

export function MembershipRequest({
    id,
    status,
    firstName,
    lastName,
    email,
    profileImage
}: iAppProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateMembershipRequest, initialState);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <p className="text-slate-400">You will like</p>
                <p className="text-primary">View all</p>
            </div>
            <li key={id} className="space-y-2 min-h-[90px]">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Image
                            src={profileImage}
                            alt={`${firstName}'s profile`}
                            width={40}
                            height={40}
                            className="rounded-md border-2"
                        />
                        <p>{firstName} {lastName}</p>
                    </div>
                    <div>
                        {(status === "PENDING" || status === "REJECTED") ? (
                            <p className="text-red-600">{status}</p>
                        ) : (
                            <p className="text-green-500">{status}</p>
                        )}
                    </div>
                </div>

                {status === 'PENDING' && (
                    <form action={formAction} className="flex gap-2">
                        <input type="hidden" name="membershipRequestId" value={id} />
                        <Button type="submit" name="status" size={"sm"} value="ACCEPTED" >Accept</Button>
                        <Button type="submit" name="status" size={"sm"} variant={"secondary"} value="REJECTED" >Reject</Button>
                    </form>
                )}

                {status === 'ACCEPTED' && (
                    <form action={formAction} className="relative gap-2 w-full">
                        <input type="hidden" name="membershipRequestId" value={id} />
                        <Button type="submit" name="status" value="REJECTED" size={"sm"} className="absolute right-0">Reject</Button>
                    </form>
                )}

                {status === 'REJECTED' && (
                    <form action={formAction} className="relative flex gap-2">
                        <input type="hidden" name="membershipRequestId" value={id} />
                        <Button type="submit" name="status" value="ACCEPTED" className="absolute right-0">Accept</Button>
                    </form>
                )}
            </li>
            
        </div>
    );
}
