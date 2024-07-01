"use client"
import { State, createSquad, updateSquad } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
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
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export interface squadProps {
    id: string;
    name: string;
    description: string;
    username: string;
    thumbnail: string;
}

function UpdateSquad({id,name,description,username,thumbnail}:squadProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateSquad, initialState);
    const [image, setImage] = useState<null | string>(thumbnail);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);
    return (
        <div className="">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="default" size="sm">Update Squad</Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-4">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Create Squad</SheetTitle>
                    </SheetHeader>
                    <form action={formAction} className="space-y-4">
                        <input type="hidden" name="squadId" value={id}/>
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                                name="name"
                                type="text"
                                defaultValue={name}
                                placeholder="Name of your resource"
                                required
                                minLength={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Squad Username</Label>
                            <Input
                                name="username"
                                type="text"
                                defaultValue={username}
                                placeholder="Name of your resource"
                                required
                                minLength={5}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                defaultValue={description}
                                placeholder="Description of your resource"
                                required
                                minLength={10}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="image" value={JSON.stringify(image)} />
                            <Label>Squad Thumbnail</Label>
                            <UploadDropzone
                                className="border-accent"
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    const uploadedUrl = res[0].url;
                                    console.log('Uploaded URL:', uploadedUrl);
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
                        <SheetFooter className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-end">
                            <SheetClose asChild type="submit">
                                <SubmitButton title="Update Squad" />
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>

    )
}

export default UpdateSquad;