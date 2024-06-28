"use client";
import { categoryItems } from "@/app/lib/jobCategory";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function SelectJobType() {
    const [selectedJobType, setSelectedJobType] = useState<string | null>(null);

    return (
        <div>
            <input type="hidden" name="jobtype" value={selectedJobType || ""} />
            <Select onValueChange={(value) => setSelectedJobType(value)}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Type of the job" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {categoryItems.map((item) => (
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
