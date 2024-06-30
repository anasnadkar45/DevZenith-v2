"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { State, updateProject, } from "@/app/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/app/lib/uploadthing";
import Image from "next/image";

interface projectProps {
    id: string;
    name: string;
    description: string;
    logo: string;
    tags: [string]
    url: string;
}
export function ProjectSettingsCard({ id, name, description, logo, url,tags: initialTags }: projectProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateProject, initialState);
    const [image, setImage] = useState<null | string>(logo);
    const [tags, setTags] = useState<string[]>(initialTags); // Added state for tags
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
        <div key={id}>
            <form action={formAction}>
                <input type="hidden" name="projectId" value={id}/>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Title
                        </Label>
                        <Input id="name" name="name" defaultValue={name} placeholder="Todo App" />
                    </div>
                    <div className="grid items-center gap-4">
                        <Label htmlFor="description" className="text-left">
                            Description
                        </Label>
                        <Textarea placeholder="Add Todo's" name="description" defaultValue={description}/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Github Project Url</Label>
                        <Input
                            name="url"
                            type="text"
                            placeholder="Github URL of your project"
                            defaultValue={url}
                            required
                            minLength={3}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <input type="hidden" name="logo" value={JSON.stringify(image)} />
                        <Label>Project Logo/Icon</Label>
                        <UploadDropzone
                            className="border-accent"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                const uploadedUrl = res[0].url;
                                setImage(uploadedUrl);
                                toast.success("Your images have been uploaded");
                            }}
                            onUploadError={(error: Error) => {
                                toast.error("Something went wrong, try again");
                            }}
                        />
                        {image && (
                            <div className="flex w-full justify-center">
                                <Image
                                    src={image}
                                    alt="Uploaded Resource Logo"
                                    width={200}
                                    height={200}
                                    className="rounded"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-2">
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
                        <div className="flex flex-wrap gap-2 mt-2 w-[300px]">
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
                </div>
                <Button type="submit">Update Project</Button>
            </form>
        </div>
    )
}