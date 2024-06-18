// app/components/project/myproject/AssignTask.tsx

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { assignTask } from "@/app/actions";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";


interface AssignTaskProps {
    projectId: string;
    members: any[];
}

export default function AssignTask({ projectId, members }: AssignTaskProps) {
    const initialState = { message: "", status: undefined };
    const [state, formAction] = useFormState(assignTask, initialState);
    // const [date, setDate] = useState<Date>()
    const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null); // State to hold members data
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="default" size={"sm"}>Assign Task</Button>
                </SheetTrigger>
                <SheetContent className="w-[500px] max-h-[100vh] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Assign new task</SheetTitle>
                    </SheetHeader>
                    <form action={formAction}>
                        <input type="hidden" name="projectId" value={projectId} />
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-4">
                                <Label htmlFor="title" className="text-left">Title</Label>
                                <Input id="title" name="title" placeholder="Todo SideBar" />
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <Label>Assignee</Label>
                                <input type="hidden" name="userId" value={selectedAssignee || ""} />
                                <Select onValueChange={(value) => setSelectedAssignee(value)}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card">
                                        <SelectGroup>
                                            {members.map(member => (
                                                <SelectItem
                                                    key={member.id}
                                                    value={member.id}
                                                >
                                                    <div className="flex gap-2 items-center">
                                                        <Image src={member.profileImage} alt="" width={30} height={30} className="rounded-md border" />
                                                        <p className="mb-1">{`${member.firstName} ${member.lastName}`}</p>
                                                    </div>

                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <input type="hidden" name="priority" value={selectedPriority || ""} />
                                <Select onValueChange={(value) => setSelectedPriority(value)}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card">
                                        <SelectGroup>
                                            <SelectItem
                                                key={1}
                                                value={"high"}
                                            >
                                                <p className="bg-red-600 px-4 pb-[3px] rounded-full border border-red-700">High</p>
                                            </SelectItem>
                                            <SelectItem
                                                key={1}
                                                value={"normal"}
                                            >
                                                <p className="bg-yellow-600 px-4 pb-[3px] rounded-full border border-yellow-700">Normal</p>
                                            </SelectItem>
                                            <SelectItem
                                                key={1}
                                                value={"low"}
                                            >
                                                <p className="bg-green-600 px-4 pb-[3px] rounded-full border border-green-700">Low</p>
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid items-center gap-4">
                                <Label htmlFor="description" className="text-left">Description</Label>
                                <Textarea className="min-h-[200px]" id="description" name="description" placeholder="User requested to add Sidebar." />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Assign Task</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
