"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function PrioritySelector() {
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

    return (
        <div>
            <input type="hidden" name="category" value={selectedPriority || ""} />
            <Select onValueChange={(value) => setSelectedPriority(value)}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                    <SelectGroup>
                        <SelectItem
                            key={1}
                            value={"high"}
                        >
                            <p className="bg-red-600 px-4 pb-[3px] rounded-full border border-red-700">High</p>
                        </SelectItem>
                        <SelectItem
                            key={1}
                            value={"normal"}
                        >
                            <p className="bg-yellow-600 px-4 pb-[3px] rounded-full border border-yellow-700">Normal</p>
                        </SelectItem>
                        <SelectItem
                            key={1}
                            value={"low"}
                        >
                            <p className="bg-green-600 px-4 pb-[3px] rounded-full border border-green-700">Low</p>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
