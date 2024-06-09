import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Define the User type to describe the user object
interface User {
    profileImage: string;
    firstName: string;
}

// Update the iAppProps interface to allow User to be null or undefined
interface iAppProps {
    id: string;
    name: string;
    username: string;
    image: string;
    description: string;
    createdAt: Date;
    User?: User | null; // Make User optional and allow it to be null
}

export function SquadCard({
    name,
    id,
    description,
    username,
    createdAt,
    image,
    User,
}: iAppProps) {
    return (
        <div className="bg-card p-2 border rounded-lg min-h-[400px] space-y-2 relative ">
            <div className="relative h-[150px]">
                <Image
                    alt="Product image"
                    src={image}
                    fill
                    className="object-cover w-full rounded-lg border"
                />
                <p className="absolute z-10 right-2 top-2 border-2 border-primary rounded-lg pb-[2px] px-2 bg-primary/50 animate-pulse">Popular</p>
            </div>
            <h1 className="text-2xl font-bold line-clamp-2">{name}</h1>
            <div className="flex gap-2 items-center">
                {User ? (
                    <Image
                        alt="User profile image"
                        src={User.profileImage}
                        width={50}
                        height={40}
                        className="rounded-xl"
                    />
                ) : (
                    <div className="rounded-xl w-[50px] h-[40px] bg-gray-200 flex items-center justify-center">
                        <span>No Image</span>
                    </div>
                )}
                <div className="leading-[15px]">
                    <h1 className="font-bold">{User ? User.firstName : "Unknown"}</h1>
                    <p className="text-slate-500 text-sm">@{username}</p>
                </div>
            </div>
            <p className="text-slate-500 line-clamp-3">{description}</p>
            <Button className="absolute bottom-2 right-2 left-2">
                <Link href={`/squads/${id}`}>
                    View Squad
                </Link>
            </Button>
        </div>
    );
}
