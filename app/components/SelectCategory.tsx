"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { categoryItems } from "../lib/categoryItems";

export function SelectCategory() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <div>
            <input type="hidden" name="category" value={selectedCategory || ""} />
            <Select onValueChange={(value) => setSelectedCategory(value)}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Select category" />
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
