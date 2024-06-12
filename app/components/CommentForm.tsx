"use client"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButtons";
import { Button } from "@/components/ui/button";
import { createComment } from "../actions";
import { useRef } from "react";
import { toast } from "sonner";

interface iAppPorps {
    squadPostId: string;
}

export function CommentForm({squadPostId}:iAppPorps) {
    const ref = useRef<HTMLFormElement>(null);
    return (
        <form action={async (formData) => {
            await createComment(formData);
            ref.current?.reset();
            toast.success(
                "Your comment has been created"
            );
        }}
            ref={ref} className="mt-5">
            <Label>Comment</Label>
            <input type="hidden" name="squadPostId" value={squadPostId} />
            <Textarea placeholder="Share your thoughts" name="comment" className="w-full mt-1 mb-2"></Textarea>
            <SubmitButton title="Comment" />
            {/* <Button>Submit</Button> */}
        </form>
    )
}