"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const categoryLinks = [
    {
        id: 0,
        name: 'All',
        href: '/resources/all'
    },
    {
        id: 1,
        name: 'Frontend',
        href: '/resources/frontend'
    },
    {
        id: 2,
        name: 'Backend',
        href: '/resources/backend'
    },
    {
        id: 3,
        name: 'Languages',
        href: '/resources/languages'
    },
    {
        id: 4,
        name: 'Opensource',
        href: '/resources/opensource'
    },
    {
        id: 5,
        name: 'devops',
        href: '/resources/devops'
    },
    {
        id: 6,
        name: 'AI',
        href: '/resources/ai'
    },
    {
        id: 7,
        name: 'Cyber Security',
        href: '/resources/cybersecurity'
    },
    {
        id: 8,
        name: 'Cloud computing',
        href: '/resources/cloudcomputing'
    },
    {
        id: 9,
        name: 'Data Structure',
        href: '/resources/datastructure'
    },
    {
        id: 10,
        name: 'Competitive Programming',
        href: '/resources/competitiveprogramming'
    },
    {
        id: 11,
        name: 'Placement Prep',
        href: '/resources/placementprep'
    },
    {
        id: 12,
        name: 'Blockchain',
        href: '/resources/blockchain'
    },
]

interface TabProps {
    name: string;
    href: string;
    selected: boolean;
    setSelected: (href: string) => void;
}

const Tab = ({ name, href, selected, setSelected }: TabProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                selected
                    ? 'bg-card border-primary rounded-lg'
                    : 'hover:bg-card hover:bg-opacity-75',
                'group text-sm flex items-center px-5 py-1 border-2 font-medium rounded-md transition-colors cursor-pointer'
            )}
            onClick={() => setSelected(href)}
        >
            {name}
        </motion.div>
    );
};

export function ResourceCategoryLinks() {
    const location = usePathname();
    const [selectedTab, setSelectedTab] = useState<string>(location);

    return (
        <ScrollArea className="w-[300px] md:w-[500px] whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-2">
                {categoryLinks.map((item) => (
                    <Link href={item.href} key={item.id}>
                        <Tab
                            name={item.name}
                            href={item.href}
                            selected={selectedTab === item.href}
                            setSelected={setSelectedTab}
                        />
                    </Link>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}