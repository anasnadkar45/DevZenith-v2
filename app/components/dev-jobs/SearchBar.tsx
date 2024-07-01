"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
    search: z.string().min(0).max(50),
});

export function SearchBar() {
    const router = useRouter();
    const query = useSearchParams();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: query.get("search") ?? "",
        },
    });

    const search = query.get("search");

    useEffect(() => {
        if (search !== form.getValues("search")) {
            form.setValue("search", search ?? "");
        }
    }, [search, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newSearchQuery = values.search ? `?search=${values.search}` : '';

        let newPath = `/devjobs${newSearchQuery}`;

        router.push(newPath);

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-2">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="w-[250px] sm:w-[440px]"
                                    placeholder="Filter jobs by keywords, such as name, location, role"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    <SearchIcon className="mr-2" /> Search
                </Button>

                {query.get("search") && (
                    <Button
                        variant="link"
                        size={"sm"}
                        onClick={() => {
                            form.setValue("search", "");
                            router.push("/devjobs");
                        }}
                    >
                        Clear
                    </Button>
                )}
            </form>
        </Form>
    );
}