"use client"

import React from 'react'
import { navItems } from './UserNav'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const SideBar = () => {
    const pathname = usePathname();
    return (
        <nav className=' pt-8 border-r h-full flex-col gap-y-4 px-4'>
            <div>
                <Link href="/">
                    <h1 className="font-bold text-3xl">
                        Dev<span className="text-primary">Zenith</span>
                    </h1>
                </Link>
            </div>
            {
                navItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <span
                            className={cn(
                                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                pathname === item.href ? "bg-accent" : "bg-transparent"
                            )}
                        >
                            <item.icon className="mr-2 h-4 w-4 text-primary" />
                            <span>{item.name}</span>
                        </span>
                    </Link>
                ))
            }
        </nav>
    )
}
