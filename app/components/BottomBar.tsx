"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaDev, FaExternalLinkSquareAlt, FaFileCode } from "react-icons/fa";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons/lib";
import { MdRoomPreferences } from "react-icons/md";
import { BriefcaseBusiness } from "lucide-react";

// Define your tabs
const TABS = [
    { name: "Resources", icon: FaExternalLinkSquareAlt, href: "/resources/all" },
    { name: "DevSquads", icon: FaDev, href: "/squads" },
    { name: "Projects", icon: FaFileCode, href: "/project/search" },
    { name: "DevRooms", icon: MdRoomPreferences, href: "/devrooms/browse" },
    { name: "DevJobs", icon: BriefcaseBusiness, href: "/devjobs" },
];

export default function BottomBar() {
    const pathname = usePathname();
    const tabRefs = useRef([]);
    const [indicatorStyles, setIndicatorStyles] = useState({ width: '0px', left: '0px' });

    const isActiveTab = (item: { name: any; icon?: IconType; href: any; }) => {
        return (
            (item.name === "Resources" && pathname.startsWith("/resources")) ||
            (item.name === "DevSquads" && pathname.startsWith("/squads")) ||
            pathname === item.href
        );
    };

    const activeTab = TABS.findIndex(isActiveTab);

    useEffect(() => {
        if (tabRefs.current[activeTab]) {
            const { offsetWidth, offsetLeft } = tabRefs.current[activeTab];
            setIndicatorStyles({
                width: `${offsetWidth}px`,
                left: `${offsetLeft}px`,
            });
        }
    }, [activeTab]);

    return (
        <div className="fixed bottom-0 w-full bg-card py-3 flex md:hidden px-3 border-t-2 ">
            <div className="relative flex justify-between w-full items-center">
                {TABS.map((tab, index) => (
                    <Link href={tab.href} key={index} passHref>
                        <button
                            ref={(el) => (tabRefs.current[index] = el)}
                            className={`relative flex flex-col items-center p-2 transition-colors duration-300 ${
                                isActiveTab(tab) ? "text-primary" : "text-slate-400"
                            }`}
                        >
                            <tab.icon className="h-6 w-6" />
                            <span className="text-sm">{tab.name}</span>
                        </button>
                    </Link>
                ))}
                <motion.div
                    className="absolute bottom-0 h-0.5 bg-primary"
                    style={{
                        width: indicatorStyles.width,
                        left: indicatorStyles.left,
                    }}
                    initial={{ left: 0 }}
                    animate={{ left: indicatorStyles.left, width: indicatorStyles.width }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </div>
    );
}
