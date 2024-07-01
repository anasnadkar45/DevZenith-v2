import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FaStar } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { HiMiniArrowLeftEndOnRectangle } from "react-icons/hi2";

import Image from "next/image";
import Link from "next/link";
import { SquadPostCard } from "@/app/components/SquadPostCard";
import UpdateSquad from "../update/page";
import { DeleteSquad } from "../delete/page";
import { unstable_noStore } from "next/cache";

async function getData(username: string) {
    const data = await prisma.squad.findUnique({
        where: {
            username: username
        },
        select: {
            name: true,
            id: true,
            description: true,
            username: true,
            image: true,
            userId: true,
            createdAt: true,
            User: true
        },
    });

    return data;
}

async function getPosts(username: string) {
    const data = await prisma.squadPost.findMany({
        where: {
            squadUsername: username
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true,
            description: true,
            squadUsername: true,
            createdAt: true,
            thumbnail: true,
            User: {
                select: {
                    firstName: true,
                    profileImage: true,
                }
            }
        }
    })
    return data
}

export default async function SquadRoutePage({
    params,
}: {
    params: { id: string };
}) {
    unstable_noStore()
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id as string;
    const data = await getData(params.id);
    const posts = await getPosts(params.id);

    if (!data) {
        return (
            <div>
                <p>No squad post found.</p>
            </div>
        );
    }


    return (
        <div className="mb-6 md:mr-0">
            <div className="flex justify-between mb-4">
                <Button variant={"outline"}>
                    <Link href={'/squads'}>
                        <HiMiniArrowLeftEndOnRectangle size={20} />
                    </Link>
                </Button>
                <div className="flex flex-wrap items-center gap-2">
                    <Button size={"sm"} asChild>
                        <Link href={user?.id ? `/squads/${data?.username}/create` : "/api/auth/login"}>
                            Create Post
                        </Link>
                    </Button>
                    {
                        userId === data.User?.id ? (
                            <div className="flex flex-wrap items-center gap-2">
                                <UpdateSquad
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    description={data.description}
                                    username={data.username}
                                    thumbnail={data.image}
                                />
                                <DeleteSquad id={data.id} />
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </div>

            </div>

            <div className="flex justify-between">
                <div className="space-y-4 max-w-[650px]">
                    <div className="flex-col md:flex gap-4 items-center">
                        <div className="relative h-[150px] w-[300px]">
                            {data.image ? (
                                <Image
                                    alt="Product image"
                                    src={data.image}
                                    fill
                                    className="object-cover w-full rounded-lg border"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center border rounded-lg bg-gray-200">
                                    <span>No Image</span>
                                </div>
                            )}
                            <p className="absolute z-10 right-2 top-2 border-2 border-primary rounded-lg pb-[2px] px-2 bg-primary/50 animate-pulse">Popular</p>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{data.name}</h1>
                            <div className="flex gap-2 h-5 items-center">
                                <p className="text-sm text-slate-400 font-semibold">{data.username}</p>
                                <div className="w-1.5 h-1.5 mt-0.5 bg-slate-400 rounded-full"></div>
                                <p className="text-xs text-slate-400">
                                    Created:{' '}
                                    {data.createdAt && new Date(data.createdAt).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                        month: 'short',
                                        day: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p>{data.description}</p>
                    <div>
                        <p className="mb-2 text-sm text-slate-400">Moderated by</p>
                        <div className="flex gap-2 items-center p-2 pr-10 bg-card border-l-4 border-primary border border-r-accent border-y-accent w-fit rounded-xl">
                            {data.User && data.User.profileImage ? (
                                <Image
                                    alt="User profile image"
                                    src={data.User.profileImage}
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
                                <h1 className="font-semibold">{data.User ? data.User.firstName : "Unknown"}</h1>
                                <div className="flex gap-1 items-center">
                                    <FaStar className="w-4 text-primary" />
                                    <p className="text-primary font-semibold text-sm">Admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b mt-4 mb-4"></div>

            {/* Display posts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
                {
                    posts.map(post => (
                        <SquadPostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            squadUsername={post.squadUsername}
                            description={post.description}
                            thumbnail={post.thumbnail}
                            createdAt={post.createdAt}
                            profileImage={post.User?.profileImage}
                            firstName={post.User?.firstName}
                            User={post.User}
                        />
                    ))
                }
            </div>
        </div>


    )
}
