"use client";
import { Share } from "lucide-react";
import { toast } from "sonner";

export function CopyLink({ id }: { id: string }) {

    async function copytoClipboard() {
        await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
        toast.success(
            "Your link is copied in your clipboard"
        );
    }
    return (
        <button className="flex items-center gap-x-1" onClick={copytoClipboard}>
            <Share className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground font-medium text-xs">Share</p>
        </button>
    );
}