"use client";
import { updateTaskStatus } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface StatusProps {
    status: string;
    taskId: string;
    projectId: string;
}

export function UpdateTaskStatus({ status, taskId, projectId }: StatusProps) {
    const initialState = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateTaskStatus, initialState);
    const [statusChanged, setStatusChanged] = useState(false); // Track status change
    const [newStatus, setNewStatus] = useState<string | null>(null); // Track new status

    const handleSubmit = (e: FormEvent<HTMLFormElement>, newStatus: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('status', newStatus);
        formData.set('taskId', taskId);
        formData.set('projectId', projectId);
        setNewStatus(newStatus); // Track the new status being set
        formAction(formData);
    };

    useEffect(() => {
        // Trigger confetti if the new status is 'DONE' and statusChanged is true
        if (newStatus === 'DONE' && statusChanged) {
            triggerConfetti();
            toast.success("task finished successfully")
            setStatusChanged(false); // Reset flag after confetti
            setNewStatus(null); // Reset newStatus after handling
        }
    }, [newStatus, statusChanged]);

    const triggerConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 200);
    };

    return (
        <div className="grid grid-cols-3 gap-1">
            <form onSubmit={(e) => {
                handleSubmit(e, 'TODO');
                setStatusChanged(true); // Set flag to true on submit
            }}>
                <Button size={"sm"} variant={"secondary"} className="w-full text-xs" type="submit">TODO</Button>
            </form>
            <form onSubmit={(e) => {
                handleSubmit(e, 'IN_PROGRESS');
                setStatusChanged(true); // Set flag to true on submit
            }}>
                <Button size={"sm"} variant={"secondary"} className="w-full text-xs" type="submit">IN_PROGRESS</Button>
            </form>
            <form onSubmit={(e) => {
                handleSubmit(e, 'DONE');
                setStatusChanged(true); // Set flag to true on submit
            }}>
                <Button size={"sm"} className="w-full text-xs font-bold bg-green-400 hover:bg-green-500 transition-all duration-75 text-black" type="submit">DONE</Button>
            </form>
        </div>
    );
}
