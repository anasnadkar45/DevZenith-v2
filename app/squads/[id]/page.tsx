import { PostDescription } from "@/app/components/PostDescription";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { JSONContent } from "@tiptap/react";
import { ArrowBigLeft, ArrowLeft, DotSquare, Link2, Menu, Star, Thermometer } from "lucide-react";
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
        <div>
            <div className="flex justify-between mb-4">
                <Button variant={"outline"}>
                    <Link href={'/squads'}>
                        <ArrowLeft />
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
                            <Menu className="border-2 rounded-lg h-full w-10 p-2" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="mt-1 bg-card">
                            <DropdownMenuItem>
                                <Link2 className="mr-2" />
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
                        <div className="flex gap-2 items-center p-2 pr-10 bg-card border w-fit rounded-xl">
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
                                    <Star className="w-4 text-primary" />
                                    <p className="text-primary font-semibold text-sm">Admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b mt-4">
                {/* Display posts */}
                <div className="posts-section">
                    {posts?.length ? (
                        posts.map((post) => (
                            <div key={post.id} >
                                <PostDescription content={post?.description as JSONContent} />
                            </div>
                        ))
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
            </div>
        </div>


    )
}
