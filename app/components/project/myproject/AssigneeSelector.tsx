"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function AssigneeSelector() {
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
                        <SelectItem
                            key={1}
                            value={"anas"}
                        >
                            Anas Nadkar
                        </SelectItem>
                        <SelectItem
                            key={1}
                            value={"sara"}
                        >
                            Sara Nadkar
                        </SelectItem>
                        <SelectItem
                            key={1}
                            value={"shakila"}
                        >
                            Shakila Nadkar
                        </SelectItem><SelectItem
                            key={1}
                            value={"shadab"}
                        >
                            Shadab Nadkar
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export function StatusSelector() {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    return (
        <div>
            <input type="hidden" name="category" value={selectedStatus || ""} />
            <Select onValueChange={(value) => setSelectedStatus(value)}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem
                            key={1}
                            value={"anas"}
                        >
                            Anas Nadkar
                        </SelectItem>
                        <SelectItem
                            key={1}
                            value={"sara"}
                        >
                            Sara Nadkar
                        </SelectItem>
                        <SelectItem
                            key={1}
                            value={"shakila"}
                        >
                            Shakila Nadkar
                        </SelectItem><SelectItem
                            key={1}
                            value={"shadab"}
                        >
                            Shadab Nadkar
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
