"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation"

export const categoryLinks = [
    {
        id: 0,
        name: 'All',
        href: '/resources/all'
    },
    {
        id: 1,
        name: 'frontend',
        href: '/resources/frontend'
    },
    {
        id: 2,
        name: 'backend',
        href: '/resources/backend'
    },
    {
        id: 3,
        name: 'devops',
        href: '/resources/devops'
    },
]

export function ResourceCategoryLinks() {
    const location = usePathname();
    return (
        <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
            {categoryLinks.map((item) => (
                <Link
                    href={item.href}
                    key={item.id}
                    className={cn(
                        location === item.href
                            ? "bg-card border-primary rounded-lg"
                            : "hover:bg-card hover:bg-opacity-75",
                        "group text-sm flex items-center px-5 py-1 border-2 font-medium rounded-md  "
                    )}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    )
}