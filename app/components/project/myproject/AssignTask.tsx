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
import { AddProjectResource } from "@/app/actions";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { CalendarIcon, FileText } from "lucide-react";
import { AssigneeSelector, StatusSelector } from "./AssigneeSelector";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns"
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface AddResourcesProps {
    id: string;
}

export default function AssignTask() {
    // const initialState = { message: "", status: undefined };
    // const [state, formAction] = useFormState(AddProjectResource, initialState);
    const [date, setDate] = useState<Date>()

    // useEffect(() => {
    //     if (state.status === "success") {
    //         toast.success(state.message);
    //     } else if (state.status === "error") {
    //         toast.error(state.message);
    //     }
    // }, [state]);

    return (
        <div>
            <Sheet >
                <SheetTrigger asChild>
                    <Button variant="default" size={"sm"}>Assign Task</Button>
                </SheetTrigger>
                <SheetContent className="w-[500px] max-h-[100vh] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Assign new task</SheetTitle>
                    </SheetHeader>
                    <form>
                        {/* <input type="hidden" name="projectId" value={id} /> */}
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-4">
                                <Label htmlFor="title" className="text-left">Title</Label>
                                <Input id="title" name="title" placeholder="Todo SideBar" />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label>Assignee</Label>
                                <AssigneeSelector />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label>Target Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            className="bg-card"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="w-full grid grid-cols-3 gap-1">
                                <div className="flex flex-col gap-y-2">
                                    <Label>Status</Label>
                                    <StatusSelector />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>Priority</Label>
                                    <StatusSelector />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>Type</Label>
                                    <StatusSelector />
                                </div>
                            </div>

                            <div className="grid items-center gap-4">
                                <Label htmlFor="description" className="text-left">Description</Label>
                                <Textarea className="min-h-[200px]" id="description" name="description" placeholder="User requested to add Sidebar." />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Add Resource</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
