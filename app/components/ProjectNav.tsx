"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TabLinks = [
    { name: "Search", href: "/project/search" },
    { name: "Joined", href: "/project/joined" },
    { name: "MyProject", href: "/project/myproject" },
];

export function ProjectNav() {
    const pathname = usePathname();

    // Determine the active tab based on the current pathname
    const activeTab = TabLinks.find(link => pathname.startsWith(link.href))?.name ?? TabLinks[0].name;

    return (
        <div className="w-full flex justify-center -mt-2">
            <Tabs value={activeTab} className="border rounded-md">
                <TabsList className="grid w-full grid-cols-3 bg-card">
                    {TabLinks.map((link) => (
                        <Link href={link.href} key={link.name}>
                            <TabsTrigger className="shadow-lg" value={link.name}>
                                {link.name}
                            </TabsTrigger>
                        </Link>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}
