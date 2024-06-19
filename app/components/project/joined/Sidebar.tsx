"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { FaExternalLinkSquareAlt, FaTasks } from "react-icons/fa";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // For collapse button

// Define your nav items without the hardcoded project ID
const navItems = [
    { name: "Dashboard", icon: MdDashboard, tooltip: "Dashboard" },
    { name: "Resources", icon: FaExternalLinkSquareAlt, tooltip: "Resources" },
    { name: "Tasks", icon: FaTasks, tooltip: "Tasks" },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    // Extract the project ID from the pathname
    // Assuming URL pattern: /project/myproject/[projectId]/...
    const projectId = pathname.split('/')[3]; 

    // Define animation variants
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
        <TooltipProvider>
            <div className={`flex flex-col ${collapsed ? "" : ""} h-full transition-all duration-300`}>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 focus:outline-none "
                    aria-label="Toggle sidebar"
                >
                    {collapsed ? <FiChevronLeft size={25} className="border-2 rounded-full" /> : <FiChevronRight size={25} className="border-2 rounded-full" />}
                </button>
                <div className='flex flex-col items-start gap-2 px-1'>
                    {navItems.map((item, index) => {
                        // Construct href dynamically using the extracted project ID
                        const href = `/project/joined/${projectId}/${item.name.toLowerCase()}`;
                        const isActive = pathname === href;

                        return (
                            <Link key={index} href={href}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <motion.span
                                            className="group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all"
                                            initial={false} // Allows us to skip initial animation
                                            animate={isActive ? "active" : "inactive"}
                                            variants={variants}
                                        >
                                            <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-slate-400"}`} />
                                            {!collapsed && <span className={`ml-2 ${isActive ? "text-primary" : "text-slate-400"}`}>{item.name}</span>}
                                        </motion.span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-background border-2">
                                        <p>{item.tooltip}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </TooltipProvider>
    );
}
