"use client";

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Package2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { FaExternalLinkSquareAlt, FaTasks } from "react-icons/fa";
import { MdDashboard, MdVideoCall } from "react-icons/md";

const navItems = [
    { name: "Dashboard", icon: MdDashboard, tooltip: "Dashboard" },
    { name: "Resources", icon: FaExternalLinkSquareAlt, tooltip: "Resources" },
    { name: "Tasks", icon: FaTasks, tooltip: "Tasks" },
    { name: "Meet", icon: MdVideoCall, tooltip: "Meet" },
];

export function SideNav() {
    const pathname = usePathname();
    const projectId = pathname.split('/')[3];

    const variants = {
        active: {
            backgroundColor: "#241639", // Equivalent to bg-primary/60
            color: "#3B82F6", // Equivalent to text-primary
            borderRight: "4px solid #6527C6", // Border on active tab
            paddingRight: "6px", // Equivalent to pl-3
        },
        inactive: {
            backgroundColor: "transparent",
            color: "#64748b", // Equivalent to text-slate-400
            borderRight: "4px solid transparent", // No border on inactive tab
            paddingRight: "6px",
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                    {navItems.map((item, index) => {
                        const href = `/project/joined/${projectId}/${item.name.toLowerCase()}`;
                        const isActive = pathname === href;

                        return (
                            <Link key={index} href={href} className="flex gap-2 items-center">
                                <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-slate-400"}`} />
                                <span className={`ml-2 ${isActive ? "text-primary" : "text-slate-400"}`}>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
}