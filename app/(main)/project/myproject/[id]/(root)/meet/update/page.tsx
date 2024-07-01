"use client"
import { State, updateMeeting, updateProjectResource, } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";

interface meetingProps {
    id: string;
    projectId: string;
    name: string;
    tags: [string];
    url: string;
    description: string;
}

export default function UpdateProjectMeeting({ id, projectId, name, tags, url, description }: meetingProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateMeeting, initialState);
    const [meetingTags, setMeetingTags] = useState<string[]>(tags); // Added state for tags
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
            setMeetingTags((prevTags) => [...prevTags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (index: number) => {
        setMeetingTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="text-green-600">
                    <FaRegEdit size={20} />
                </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Update Meeting</SheetTitle>
                </SheetHeader>
                <form action={formAction} className="space-y-4">
                <input type="hidden" name="meetingId" value={id} />
                    <input type="hidden" name="projectId" value={projectId} />
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-left">Title</Label>
                        <Input id="name" name="name" defaultValue={name} placeholder="DevZenith a Developers Platform" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-left">Description</Label>
                        <Textarea name="description" defaultValue={description} placeholder="Working on amazing stuff, come join us"  />
                    </div>
                    <div className="space-y-2">
                        <Label>Github Url</Label>
                        <Input
                            name="url"
                            type="text"
                            defaultValue={url}
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
                        <input type="hidden" name="tags" value={JSON.stringify(meetingTags)} />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {meetingTags.map((tag, index) => (
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
                            <SubmitButton title="Update Meeting" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}