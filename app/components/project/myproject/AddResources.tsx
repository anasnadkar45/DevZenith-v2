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
import { FileText } from "lucide-react";

interface AddResourcesProps {
    id: string;
}

export default function AddResources({ id }: AddResourcesProps) {
    const initialState = { message: "", status: undefined };
    const [state, formAction] = useFormState(AddProjectResource, initialState);
    const [file, setFile] = useState<null | string>(null);

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
                    <Button variant="default" size={"sm"}>Add Resource</Button>
                </SheetTrigger>
                <SheetContent className="w-[500px] max-h-[100vh] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Add new resource</SheetTitle>
                    </SheetHeader>
                    <form action={formAction}>
                        <input type="hidden" name="projectId" value={id} />
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-4">
                                <Label htmlFor="name" className="text-left">Name</Label>
                                <Input id="name" name="name" placeholder="Todo App" />
                            </div>
                            <div className="grid items-center gap-4">
                                <Label htmlFor="category" className="text-left">Category</Label>
                                <Input id="category" name="category" placeholder="Image" />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label>Link</Label>
                                <Input name="link" type="text" placeholder="https://github.com/" />
                            </div>
                            <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="file" value={file !== null ? JSON.stringify(file) : ''} />
                                <Label>Resource File</Label>
                                <UploadDropzone
                                    className="border-accent"
                                    endpoint="resourcceFileUpload"
                                    onClientUploadComplete={(res) => {
                                        const uploadedUrl = res[0].url;
                                        setFile(uploadedUrl);
                                        toast.success("Your file has been uploaded");
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error("Something went wrong, try again");
                                    }}
                                />
                                {file && (
                                    <div className="w-full">
                                        <a
                                            className="flex space-x-3 items-center text-purple-600"
                                            target="_blank"
                                            href={file}
                                        >
                                            <FileText />
                                            <span>View File</span>
                                        </a>
                                    </div>
                                )}
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
