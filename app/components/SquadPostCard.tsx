import Image from "next/image";
import { BiSolidCommentDots } from "react-icons/bi";
import { IoBookmark } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";
import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// Define the User type to describe the user object
interface User {
    profileImage: string;
    firstName: string;
}

// Update the iAppProps interface to allow User to be null or undefined
interface iAppProps {
    id: string;
    title: string;
    squadUsername: any;
    thumbnail: string | null;  // Allow null
    description: any;  // Allow null
    createdAt: Date;
    profileImage?: string | null;  // Optional and nullable
    firstName?: string | null;  // Optional and nullable
    User?: User | null;  // Allow null
}



export function SquadPostCard({
    id,
    title,
    createdAt,
    description,
    firstName,
    profileImage,
    squadUsername,
    thumbnail,
    User
}: iAppProps) {
    return (
        <div className="bg-card p-2 border rounded-lg min-h-[300px] space-y-2 relative">
            <Link href={`/squadpost/${id}`}>
                <div className="flex gap-2 items-center">
                    {profileImage ? (
                        <Image
                            alt="User profile image"
                            src={profileImage}
                            width={40}
                            height={40}
                            className="rounded-xl"
                        />
                    ) : (
                        <div className="rounded-xl w-[50px] h-[40px] bg-gray-200 flex items-center justify-center">
                            <span>No Image</span>
                        </div>
                    )}
                    <div className="leading-[15px]">
                        <h1 className="font-bold">{firstName || "Unknown"}</h1>
                        <p className="text-primary text-sm font-semibold">1 hour ago</p>
                    </div>
                </div>
                <h1 className="line-clamp-2">{title}</h1>
                <div className="relative h-[150px]">
                    <Image
                        alt="squad image"
                        src={thumbnail as string}
                        fill
                        className="object-cover w-full rounded-lg border"
                    />
                </div>
            </Link>
            <div className="flex justify-between absolute bottom-0">
                <Button variant={"ghost"} className="flex items-center gap-2">
                    <FaArrowCircleUp className="text-slate-300" size={20} />
                    <p className="text-slate-300 text-lg">99</p>
                </Button>
                <Button variant={"ghost"} className="flex items-center gap-2">
                    <BiSolidCommentDots className="text-slate-300" size={20} />
                    <p className="text-slate-300 text-lg">99</p>
                </Button>
                <Button variant={"ghost"} className="flex items-center gap-2">
                    <IoBookmark className="text-slate-300" size={20} />
                </Button>
                <Button variant={"ghost"} className="flex items-center gap-2">
                    <FaShare className="text-slate-300" size={20} />
                    <p className="text-slate-300 text-lg">99</p>
                </Button>
            </div>
        </div>
    );
}
