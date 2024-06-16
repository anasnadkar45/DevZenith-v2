"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { TbDashboard } from "react-icons/tb";
import { FaExternalLinkSquareAlt, FaTasks } from "react-icons/fa";

// Define your nav items without the hardcoded project ID
const navItems = [
    { name: "Dashboard", icon: TbDashboard },
    { name: "Resources", icon: FaExternalLinkSquareAlt },
    { name: "Tasks", icon: FaTasks },
];

export function Sidebar() {
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
        <div className='grid items-start gap-2 '>
            {navItems.map((item, index) => {
                // Construct href dynamically using the extracted project ID
                const href = `/project/myproject/${projectId}/${item.name.toLowerCase()}`;
                const isActive = pathname === href;

                return (
                    <Link key={index} href={href}>
                        <motion.span
                            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all"
                            initial={false} // Allows us to skip initial animation
                            animate={isActive ? "active" : "inactive"}
                            variants={variants}
                        >
                            <item.icon className={`mr-2 h-4 w-4 ${isActive ? "text-primary" : "text-slate-400"}`} />
                            <span className={isActive ? "text-primary" : "text-slate-400"}>{item.name}</span>
                        </motion.span>
                    </Link>
                );
            })}
        </div>
    );
}
