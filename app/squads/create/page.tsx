"use client"
import { State, createSquad } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export default function squadPage() {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(createSquad, initialState);
    const [image, setImage] = useState<null | string>(null);

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
                        <CardTitle>Create Squad</CardTitle>
                        <CardDescription>Please describe your squad in detail.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>Name</Label>
                            <Input
                                name="name"
                                type="text"
                                placeholder="Name of your resource"
                                required
                                minLength={3}
                            />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Username</Label>
                            <Input
                                name="username"
                                type="text"
                                placeholder="Name of your resource"
                                required
                                minLength={5}
                            />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                placeholder="Description of your resource"
                                required
                                minLength={10}
                            />
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

                        <div className="flex flex-col gap-y-2">
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
                        </div>

                    </CardContent>
                    <CardFooter className="mt-5">
                        <SubmitButton title="Create your Squad" />
                    </CardFooter>
                </Card>
            </form>
        </div>

    )
}