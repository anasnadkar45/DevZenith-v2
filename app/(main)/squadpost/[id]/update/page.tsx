"use client"
import { State, createSquad, updateSquad, updateSquadPost } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Tiptap } from "@/app/components/Tiptap";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export interface squadProps {
    id: string;
    title: string;
    description: JSONContent;
    squadId: string;
    thumbnail: string;
    squadUsername: string;
}

export default function UpdateSquadPost({ id, title, description, squadId, thumbnail,squadUsername }: squadProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateSquadPost, initialState);
    const [json, setJson] = useState<null | JSONContent>(description);
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
        <div className="grid ">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="default" size="sm">Update SquadPost</Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-4">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Update SquadPost</SheetTitle>
                    </SheetHeader>
                    <form className="space-y-4" action={formAction}>
                        <input type="hidden" name="squadId" value={squadId} />
                        <input type="hidden" name="squadPostId" value={id} />
                        <input type="hidden" name="squadUsername" value={squadUsername} />
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input
                                name="title"
                                type="text"
                                defaultValue={title}
                                placeholder="Title of your Squad Post"
                                required
                                minLength={3}
                            />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="thumbnail" value={JSON.stringify(image)} />
                            <Label>SquadPost Thumbnail</Label>
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

                        <div className="flex flex-col gap-y-2">
                            <input
                                type="hidden"
                                name="description"
                                value={json ? JSON.stringify(json) : ""}
                            />
                            <Label>Description</Label>
                            <Tiptap json={json} setJson={setJson} />
                            {state?.errors?.["description"]?.[0] && (
                                <p className="text-destructive">
                                    {state?.errors?.["description"]?.[0]}
                                </p>
                            )}
                        </div>
                        <SheetFooter className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-end">
                            <SheetClose asChild type="submit">
                                <SubmitButton title="Update SquadPost" />
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}