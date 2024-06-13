"use client"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom"

export function SubmitButton({ title }: { title: string }) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                </Button>
            ) : (
                <Button type="submit">{title}</Button>
            )}
        </>
    )
}

export function ViewSquad({ title }: { title: string }) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className="absolute bottom-2 right-2 left-2">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                </Button>
            ) : (
                <Button type="submit" className="absolute bottom-2 right-2 left-2">{title}</Button>
            )}
        </>
    )
}