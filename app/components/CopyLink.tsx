"use client";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { FaShare } from "react-icons/fa6";
import { toast } from "sonner";

export function CopyLink({ id }: { id: string }) {

    async function copytoClipboard() {
        await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
        toast.success(
            "Your link is copied in your clipboard"
        );
    }
    return (
        <Button variant={"ghost"} size={"sm"} className="flex items-center gap-2 group hover:bg-primary/40 transition-all hover:duration-150" onClick={copytoClipboard}>
            <FaShare className="text-slate-300 group-hover:text-primary transition-all hover:duration-150" size={20} />
            <p className="group-hover:text-primary text-slate-400 font-bold text-sm">Share</p>
        </Button>
    );
}