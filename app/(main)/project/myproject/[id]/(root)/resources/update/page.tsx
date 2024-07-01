"use client"
import { State, updateProjectResource, } from "@/app/actions";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";

interface resourceProps {
    id: string;
    projectId: string;
    name: string;
    category: string;
    link: string;
    file: string;
}

function UpdateProjectResource({ id, projectId, name, category, link, file }: resourceProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateProjectResource, initialState);
    const [resourceFile, setResourceFile] = useState<null | string>(file);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="flex gap-2 text-green-600 items-center w-[140px]">
                    <FaRegEdit size={20} />
                </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Add new resource</SheetTitle>
                </SheetHeader>
                <form action={formAction}>
                    <input type="hidden" name="resourceId" value={id} />
                    <input type="hidden" name="projectId" value={projectId} />
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center gap-4">
                            <Label htmlFor="name" className="text-left">Name</Label>
                            <Input id="name" name="name" defaultValue={name} placeholder="Name of an resource" />
                        </div>
                        <div className="grid items-center gap-4">
                            <Label htmlFor="category" className="text-left">Category</Label>
                            <Input id="category" name="category" defaultValue={category} placeholder="Category of an resource like zip, image, video" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Link</Label>
                            <Input name="link" type="text" defaultValue={link} placeholder="https://github.com/" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="file" value={file !== null ? JSON.stringify(file) : ''} />
                            <Label>Resource File</Label>
                            <UploadDropzone
                                className="border-accent"
                                endpoint="resourcceFileUpload"
                                onClientUploadComplete={(res) => {
                                    const uploadedUrl = res[0].url;
                                    setResourceFile(uploadedUrl);
                                    toast.success("Your file has been uploaded");
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error("Something went wrong, try again");
                                }}
                            />
                            {resourceFile && (
                                <div className="w-full">
                                    <a
                                        className="flex space-x-3 items-center text-purple-600"
                                        target="_blank"
                                        href={resourceFile}
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
                            <Button type="submit">Update Resource</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}

export default  UpdateProjectResource;