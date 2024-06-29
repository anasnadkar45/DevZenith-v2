"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { State, postDevJob } from "@/app/actions";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { UploadDropzone } from "@/app/lib/uploadthing";
import Image from "next/image";
import { JSONContent } from "@tiptap/react";
import { Tiptap } from "../Tiptap";
import { SelectJobType } from "./SelectJobType";

export default function PostJob() {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(postDevJob, initialState);
    const [batches, setBatches] = useState<string[]>([]);
    const [batchInput, setBatchInput] = useState<string>("");
    const [image, setImage] = useState<string>();
    const [json, setJson] = useState<null | JSONContent>(null);

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    const handleAddBatch = () => {
        if (batchInput.trim()) {
            setBatches((prevBatches) => [...prevBatches, batchInput.trim()]);
            setBatchInput("");
        }
    };

    const handleRemoveBatch = (index: number) => {
        setBatches((prevBatches) => prevBatches.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="default" size="sm">Post Job</Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-4">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Post Job</SheetTitle>
                    </SheetHeader>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Company Name</Label>
                            <Input id="name" name="name" placeholder="Google" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Company Location</Label>
                            <Input id="location" name="location" placeholder="Bangalore" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="logo" value={image} />
                            <Label>Company Logo</Label>
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
                                        alt="Uploaded Company Logo"
                                        width={200}
                                        height={200}
                                        className="rounded"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Batches</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={batchInput}
                                    onChange={(e) => setBatchInput(e.target.value)}
                                    placeholder="Enter a batch like 2024, 2025, 2026"
                                />
                                <Button type="button" onClick={handleAddBatch}>Add Tag</Button>
                            </div>
                            <input type="hidden" name="batches" value={JSON.stringify(batches)} />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {batches.map((batch, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border rounded-full px-4 py-1 text-sm flex items-center gap-2"
                                    >
                                        {batch}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveBatch(index)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Job Role</Label>
                            <Input id="role" name="role" placeholder="Frontend Developer" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <input
                                type="hidden"
                                name="roledescription"
                                value={json ? JSON.stringify(json) : ""}
                            />
                            <Label>Job Description</Label>
                            <Tiptap json={json} setJson={setJson} />
                            {state?.errors?.["roledescription"]?.[0] && (
                                <p className="text-destructive">
                                    {state?.errors?.["roledescription"]?.[0]}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Job Type</Label>
                            <SelectJobType />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input id="duration" name="duration" placeholder="Fulltime" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary</Label>
                            <Input id="salary" name="salary" placeholder="5-10 LPA" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="link">Link</Label>
                            <Input
                                name="link"
                                type="text"
                                placeholder="Job application link"
                                required
                                minLength={3}
                            />
                        </div>

                        <SheetFooter className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-end">
                            <SheetClose asChild type="submit">
                                <SubmitButton title="Post Job" />
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
