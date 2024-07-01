"use client"
import { State, createSquadPost } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Tiptap } from "@/app/components/Tiptap";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export default function CreatePostRoute({
    params,
}: {
    params: { id: string };
}) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(createSquadPost, initialState);
    const [json, setJson] = useState<null | JSONContent>(null);
    const [image, setImage] = useState<null | string>(null);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
            redirect(`/squads/${params.id}`)
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state, params.id]);

    return (
        <div className="grid ">
            <form className="" action={formAction}>
                <Card>
                    <input type="hidden" name="squadUsername" value={params.id} />
                    <CardHeader>
                        <CardTitle>Create SquadPost</CardTitle>
                        <CardDescription>Please describe your squad post in detail.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input
                                name="title"
                                type="text"
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
                    </CardContent>
                    <CardFooter className="mt-5">
                        <SubmitButton title="Create your Squad Post" />
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}