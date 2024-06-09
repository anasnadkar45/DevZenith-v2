import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { HiMiniArrowLeftEndOnRectangle } from "react-icons/hi2";
import { BiSolidCommentDots } from "react-icons/bi";
import { IoBookmark } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

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
        select: {
            id: true,
            title: true,
            description: true,
            squadUsername: true,
            User: true,
            createdAt: true,
            thumbnail: true,
        }
    })
    return data
}

export default async function SquadRoutePage({
    params,
}: {
    params: { id: string };
}) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
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
        <div className="mb-6 mr-3 md:mr-0">
            <div className="flex justify-between mb-4">
                <Button variant={"outline"}>
                    <Link href={'/squads'}>
                        <HiMiniArrowLeftEndOnRectangle size={20}/>
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <Button asChild>
                        <Link href={user?.id ? `/squads/${data?.username}/create` : "/api/auth/login"}>
                            Create Post
                        </Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <CiMenuKebab className="border-2 rounded-lg h-full w-10 p-2" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="mt-1 bg-card">
                            <DropdownMenuItem>
                                <FaLink className="mr-2" />
                                Invitation Link
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>

            <div className="flex justify-between">
                <div className="space-y-4 max-w-[650px] pr-6">
                    <div className="flex gap-4 items-center">
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
                {posts?.length ? (
                    posts.map((post) => (
                        <div className="bg-card p-2 border rounded-lg min-h-[300px] space-y-2 relative">
                            <div className="flex gap-2 items-center">
                                {post.User ? (
                                    <Image
                                        alt="User profile image"
                                        src={post.User.profileImage}
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
                                    <h1 className="font-bold">{post.User ? post.User.firstName : "Unknown"}</h1>
                                    <p className="text-primary text-sm font-semibold">1 hour ago</p>
                                </div>
                            </div>
                            <h1 className="line-clamp-2">{post.title}</h1>
                            <div className="relative h-[150px]">
                                <Image
                                    alt="squad image"
                                    src={post.thumbnail as string}
                                    fill
                                    className="object-cover w-full rounded-lg border"
                                />
                            </div>
                            <div className="flex justify-between absolute bottom-0 ">
                                <Button variant={"ghost"} className="flex items-center gap-2">
                                    <FaArrowCircleUp className="text-slate-300" size={20}/>
                                    <p className="text-slate-300 text-lg ">99</p>
                                </Button>
                                <Button variant={"ghost"} className="flex items-center gap-2">
                                    <BiSolidCommentDots className="text-slate-300" size={20}/>
                                    <p className="text-slate-300 text-lg ">99</p>
                                </Button>
                                <Button variant={"ghost"} className="flex items-center gap-2">
                                    <IoBookmark className="text-slate-300" size={20}/>
                                </Button>
                                <Button variant={"ghost"} className="flex items-center gap-2">
                                    <FaShare className="text-slate-300" size={20}/>
                                    <p className="text-slate-300 text-lg ">99</p>
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </div>
        </div>


    )
}
