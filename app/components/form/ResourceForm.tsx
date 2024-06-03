"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../SelectCategory";
import { SubmitButton } from "../SubmitButtons";
import { AddResource, State } from "@/app/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export function ResourceForm() {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(AddResource, initialState);

    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
          toast.success(state.message);
        } else if (state.status === "error") {
          toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Create Resource</CardTitle>
                    <CardDescription>Please describe your resource in detail.</CardDescription>
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
                        <Label>Description</Label>
                        <Input
                            name="description"
                            type="text"
                            placeholder="Description of your resource"
                            required
                            minLength={10}
                        />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label>URL</Label>
                        <Input
                            name="url"
                            type="text"
                            placeholder="URL of your resource"
                            required
                            minLength={3}
                        />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label>Category</Label>
                        <SelectCategory />
                    </div>
                </CardContent>
                <CardFooter className="mt-5">
                    <SubmitButton title="Create your Resource" />
                </CardFooter>
            </Card>
        </form>
    );
}
