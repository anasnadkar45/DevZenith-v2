"use client"
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Resources", href: "/resources/all", icon: Home }, // Update href to /resources/all
    { name: "Code Review", href: "/codereview", icon: Home },
    { name: "Dev Rooms", href: "/devrooms", icon: Home },
];

export function SideBarLinks() {
    const pathname = usePathname();
    return (
        <div className='px-3 grid items-start gap-2'>
            {
                navItems.map((item, index) => {
                    const isActive = pathname.startsWith(item.href) || (item.name === "Resources" && pathname.startsWith("/resources"));
                    return (
                        <Link key={index} href={item.href}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    isActive ? "bg-accent" : "bg-transparent"
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
