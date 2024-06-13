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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TbMessage2Heart } from "react-icons/tb";
import { SubmitButton } from "../SubmitButtons"
import { Textarea } from "@/components/ui/textarea"

export function FeedBack() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost"><TbMessage2Heart size={25} /></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Feedback</SheetTitle>
                    <SheetDescription className="text-base">
                        We value your feedback. How can we improve your experience?
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Title
                        </Label>
                        <Input id="name" placeholder="Add Dark Mode" />
                    </div>
                    <div className="grid items-center gap-4">
                        <Label htmlFor="username" className="text-left">
                            Label
                        </Label>
                        <Select>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-background">
                                <SelectGroup>
                                    <SelectItem value="apple">Issue</SelectItem>
                                    <SelectItem value="banana">Idea</SelectItem>
                                    <SelectItem value="blueberry">Question</SelectItem>
                                    <SelectItem value="grapes">Complaint</SelectItem>
                                    <SelectItem value="pineapple">Feature Request</SelectItem>
                                    <SelectItem value="pineapple">Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid  items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Message
                        </Label>
                        <Textarea placeholder="Please add dark mode to the app" />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <SubmitButton title="Send Feedback"/>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
