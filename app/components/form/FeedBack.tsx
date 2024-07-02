"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { TbMessage2Heart } from "react-icons/tb";
import { SubmitButton } from "../SubmitButtons"
import { Textarea } from "@/components/ui/textarea"
import { SelectFeedbackType } from "../SelectFeedbackType"
import { useFormState } from "react-dom";
import { State, postFeedback } from "@/app/actions";
import { useEffect } from "react"
import { toast } from "sonner"

export function FeedBack() {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(postFeedback, initialState);

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);
    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button variant="ghost" size={"icon"}><TbMessage2Heart size={25} /></Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Feedback</SheetTitle>
                    <SheetDescription className="text-base">
                        We value your feedback. How can we improve your experience?
                    </SheetDescription>
                </SheetHeader>
                <form action={formAction}>
                    <div className="grid gap-4 py-4">
                        <div className="grid  items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                                Title
                            </Label>
                            <Input id="title" name="title" placeholder="Add Dark Mode" />
                        </div>
                        <div className="grid items-center gap-4">
                            <div className="flex flex-col gap-y-2">
                                <Label>Feedback type</Label>
                                <SelectFeedbackType />
                            </div>
                        </div>
                        <div className="grid  items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                                Message
                            </Label>
                            <Textarea name="description" placeholder="Please add dark mode to the app" />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <SubmitButton title="Send Feedback" />
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
