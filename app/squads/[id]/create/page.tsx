"use client"
import { State, createSquadPost } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { TipTapEditor } from "@/app/components/Tiptap";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export default function CreatePostRoute({
    params,
}: {
    params: { id: string };
}) {
    const initialState: State = { message: "", status: undefined }
    const [state, formAction] = useFormState(createSquadPost, initialState)
    const [json, setJson] = useState<null | JSONContent>(null);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);
    return (
        <div className="grid grid-cols-3">
            <form className="col-span-3 lg:col-span-2" action={formAction}>
                <Card>
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
                            <input
                                type="hidden"
                                name="description"
                                value={JSON.stringify(json)}
                            />
                            <Label>Description</Label>
                            <TipTapEditor json={json} setJson={setJson} />
                            {state?.errors?.["description"]?.[0] && (
                                <p className="text-destructive">
                                    {state?.errors?.["description"]?.[0]}
                                </p>
                            )}
                        </div>

                        {/* <div className="flex flex-col gap-y-2">
                            <Label>URL</Label>
                            <Input
                                name="url"
                                type="text"
                                placeholder="URL of your resource"
                                required
                                minLength={3}
                            />
                        </div> */}

                        {/* <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="image" value={JSON.stringify(image)} />
                            <Label>Resource Logo/Icon</Label>
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
                        </div> */}

                    </CardContent>
                    <CardFooter className="mt-5">
                        <SubmitButton title="Create your Squad Post" />
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}