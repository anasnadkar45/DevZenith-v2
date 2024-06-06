"use client"
import { cn } from "@/lib/utils";
import { File, Home, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Resources", href: "/resources/all", icon: Home }, // Update href to /resources/all
    { name: "Code Review", href: "/codereview", icon: Home },
    { name: "DevSquads", href: "/squads", icon: Users },
    { name: "Projects", href: "/projects", icon: File },
];

export function SideBarLinks() {
    const pathname = usePathname();
    return (
        <div className='px-3 grid items-start gap-2'>
            {
                navItems.map((item, index) => {
                    const isActive =  (item.name === "Resources" && pathname.startsWith("/resources")) || (item.name === "DevSquads" && pathname.startsWith("/squads")) || pathname === item.href;
                    return (
                        <Link key={index} href={item.href}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/20 hover:text-accent-foreground",
                                    isActive ? "bg-primary/20 border-l-4 border-primary text-primary pl-2" : "bg-transparent"
                                )}
                            >
                                <item.icon className="mr-2 h-4 w-4 text-primary" />
                                <span>{item.name}</span>
                            </span>
                        </Link>
                    )
                })
            }
        </div>
    )
}
