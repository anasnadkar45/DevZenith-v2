"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { feedbackCategoryItem } from "../lib/feedbackCategory";

export function SelectFeedbackType() {
    const [selectedJobType, setSelectedJobType] = useState<string | null>(null);

    return (
        <div>
            <input type="hidden" name="category" value={selectedJobType || ""} />
            <Select onValueChange={(value) => setSelectedJobType(value)}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Type of the feedback" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {feedbackCategoryItem.map((item) => (
                            <SelectItem
                                key={item.id}
                                value={item.name}
                            >
                                {item.title}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
