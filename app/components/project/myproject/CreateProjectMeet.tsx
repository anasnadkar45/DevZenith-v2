"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { TbMessage2Heart } from "react-icons/tb";
import { Textarea } from "@/components/ui/textarea"
import { SubmitButton } from "@/app/components/SubmitButtons"
import { State, createMeeting, } from "@/app/actions"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useFormState } from "react-dom"

interface CreateProjectMeetingProps {
    projectId: string;
}

export default function CreateProjectMeet({projectId}:CreateProjectMeetingProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(createMeeting, initialState);
    const [tags, setTags] = useState<string[]>([]); // Added state for tags
    const [tagInput, setTagInput] = useState<string>("");

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    const handleAddTag = () => {
        if (tagInput.trim()) {
            setTags((prevTags) => [...prevTags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (index: number) => {
        setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="default" size={"sm"}>Create Project Meeting</Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:w-[500px] max-h-[100vh] overflow-y-auto p-4">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Create Meeting</SheetTitle>
                    </SheetHeader>
                    <form action={formAction} className="space-y-4">
                        <input type="hidden" name="projectId" value={projectId} />
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-left">Title</Label>
                            <Input id="name" name="name" placeholder="DevZenith a Developers Platform" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-left">Description</Label>
                            <Textarea placeholder="Working on amazing stuff, come join us" name="description" />
                        </div>
                        <div className="space-y-2">
                            <Label>Github Url</Label>
                            <Input
                                name="url"
                                type="text"
                                placeholder="Github URL of your project"
                                required
                                minLength={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Enter a tag"
                                />
                                <Button type="button" onClick={handleAddTag}>Add Tag</Button>
                            </div>
                            <input type="hidden" name="tags" value={JSON.stringify(tags)} />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border rounded-full px-4 py-1 text-sm flex items-center gap-2"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(index)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SheetFooter className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-end">
                            <SheetClose asChild>
                                <SubmitButton title="Create Meeting" />
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
