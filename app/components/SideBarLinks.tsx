"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaDev, FaExternalLinkSquareAlt, FaFileCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdRoomPreferences } from "react-icons/md";

// Define your nav items
export const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: AiFillHome },
    { name: "Resources", href: "/resources/all", icon: FaExternalLinkSquareAlt },
    { name: "DevSquads", href: "/squads", icon: FaDev },
    { name: "ProjectCollab", href: "/project/search", icon: FaFileCode },
    { name: "DevRooms", href: "/devrooms/browse", icon: MdRoomPreferences },
];

export function SideBarLinks() {
    const pathname = usePathname();

    // Define animation variants
    const variants = {
        active: {
            backgroundColor: "#241639", // Equivalent to bg-primary/60
            color: "#3B82F6", // Equivalent to text-primary
            borderLeft: "4px solid #6527C6", // Border on active tab
            paddingLeft: "6px", // Equivalent to pl-3
        },
        inactive: {
            backgroundColor: "transparent",
            color: "#64748b", // Equivalent to text-slate-400
            borderLeft: "4px solid transparent", // No border on inactive tab
            paddingLeft: "6px",
        }
    };

    return (
        <div className='px-3 grid items-start gap-2'>
            {navItems.map((item, index) => {
                const isActive = (item.name === "Resources" && pathname.startsWith("/resources")) || (item.name === "ProjectCollab" && pathname.startsWith("/project")) || (item.name === "DevSquads" && pathname.startsWith("/squads")) || (item.name === "DevRooms" && pathname.startsWith("/devrooms")) || pathname === item.href;

                return (
                    <Link key={index} href={item.href}>
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
