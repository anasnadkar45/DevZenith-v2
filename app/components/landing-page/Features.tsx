import { CalendarIcon, FileTextIcon, InputIcon } from "@radix-ui/react-icons";
import { BriefcaseBusiness, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import Marquee from "../magicui/marquee";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import Image from "next/image";
import DevJobs from "../../../public/DevJobs.png"
import DevSquads from "../../../public/DevSquads.png"
import DevRooms from "../../../public/DevRooms.png"
import Resources from "../../../public/Resources.png"
import { FaDev, FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdRoomPreferences } from "react-icons/md";

const files = [
    {
        name: "bitcoin.pdf",
        body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
    },
    {
        name: "finances.xlsx",
        body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
    },
    {
        name: "logo.svg",
        body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
    },
    {
        name: "keys.gpg",
        body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
    },
    {
        name: "seed.txt",
        body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
    },
];

interface Item {
    name: string;
    description: string;
    icon: string;
    color: string;
    time: string;
}

let notifications = [
    {
        name: "Payment received",
        description: "Magic UI",
        time: "15m ago",

        icon: "💸",
        color: "#00C9A7",
    },
    {
        name: "User signed up",
        description: "Magic UI",
        time: "10m ago",
        icon: "👤",
        color: "#FFB800",
    },
    {
        name: "New message",
        description: "Magic UI",
        time: "5m ago",
        icon: "💬",
        color: "#FF3D71",
    },
    {
        name: "New event",
        description: "Magic UI",
        time: "2m ago",
        icon: "🗞️",
        color: "#1E86FF",
    },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-2xl"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    );
};

const features = [
    {
        Icon: FaExternalLinkSquareAlt,
        name: "Resources",
        description: "Resources that you need to make your next application",
        href: "/",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] ">
                <Image src={Resources} alt="" width={500} height={500} />
            </div>
        ),
    },
    {
        Icon: BriefcaseBusiness,
        name: "DevJobs",
        description: "Find all the job in one place.",
        href: "/",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] ">
                <Image src={DevJobs} alt="" width={1000} height={500} />
            </div>
        ),
    },
    {
        Icon: FaDev,
        name: "DevSquads",
        description: "Unleashing the magic of developer communities with Squads. An opportunity to dive deep and go niche together with like-minded devs.",
        href: "/",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] ">
                <Image src={DevSquads} alt="" width={1000} height={500} />
            </div>
        ),
    },
    {
        Icon: MdRoomPreferences,
        name: "DevRooms",
        description: "Host and Join Live Sessions with DevRooms: Seminars, Code Reviews, and Interactive Events.",
        className: "col-span-3 lg:col-span-1",
        href: "/",
        cta: "Learn more",
        background: (
            <div className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] ">
                <Image src={DevRooms} alt="" width={1000} height={500} />
            </div>
        ),
    },
];

export function Features() {
    return (
        <div className="px-4">
            <h1 className="text-4xl font-black mt-8 text-center">Explore <span className="text-primary">More</span> Features</h1>
            <BentoGrid className="mt-8">
                {features.map((feature, idx) => (
                    <BentoCard key={idx} {...feature} />
                ))}
            </BentoGrid>
        </div>

    );
}
