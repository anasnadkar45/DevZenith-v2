import { PostDescription } from "@/app/components/PostDescription";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import Link from "next/link";
import { BsCopy } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";

async function getData(id: string) {
    const data = await prisma.squadPost.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            thumbnail: true,
            description: true,
            createdAt: true,
            squadUsername: true,
            User: true,
            Squad: {
                select: {
                    image: true,
                    description: true,
                    createdAt: true,
                }
            }
        }
    });
    return data;
}

async function getMorePosts(squadUsername: string) {
    const data = await prisma.squadPost.findMany({
        where: {
            squadUsername: squadUsername
        },
        take: 4,
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true,
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                }
            }
        }
    });
    return data;
}

export default async function SquadPostRoute({
    params,
}: {
    params: { id: string };
}) {
    const data = await getData(params.id);
    const morePosts = await getMorePosts(data?.squadUsername as string)
    return (
        <div className="flex-col xl:grid xl:grid-cols-4 h-full space-y-4 md:space-x-4">
            <div className="lg:col-span-3 w-full mx-auto space-y-2">
                <p className="text-2xl font-bold">{data?.title}</p>
                <p className="text-sm text-slate-400">
                    Created:{' '}
                    {data?.createdAt && new Date(data.createdAt).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'short',
                        day: "numeric"
                    })}
                </p>
                <div className="relative h-[200px] sm:h-[250px] md:h-[350px] w-full">
                    {data?.thumbnail ? (
                        <Image
                            alt="Product image"
                            src={data.thumbnail}
                            fill
                            className="object-cover w-full rounded-lg border"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center border rounded-lg bg-gray-200">
                            <span>No Image</span>
                        </div>
                    )}
                </div>
                <div className="max-w-[800px] mx-auto">
                    <PostDescription content={data?.description as JSONContent} />
                </div>
            </div>
            <div className="space-y-4">
                <div className="border h-fit p-3 rounded-xl">
                    <p className="text-slate-400">Would you recommend this post?</p>
                    <Button variant={"ghost"}>
                        <BsCopy size={20} />
                    </Button>
                    <Button variant={"ghost"}>
                        <FaWhatsapp size={20} />
                    </Button>
                    <Button variant={"ghost"}>
                        <FaXTwitter size={20} />
                    </Button>
                    <Button variant={"ghost"}>
                        <SlSocialLinkedin size={20} />
                    </Button>
                </div>

                <div className="border rounded-lg">
                    <p className="text-center border-b py-2 text-slate-400">More posts from {data?.squadUsername}</p>
                    <div className="p-2 space-y-2">
                        {morePosts?.map((post) => (
                            <Link href={`/squadpost/${post.id}`}>
                                <div key={post?.id} className="gap-2 p-2 bg-card rounded-lg mb-2">
                                    <div className="flex gap-2 items-center">
                                        {post.User?.profileImage && (
                                            <Image src={post.User?.profileImage}
                                                alt={post.title}
                                                width={40}
                                                height={40}
                                                className="rounded-xl border-2 "
                                            />
                                        )}
                                        <p className="text-slate-500">
                                            {post.User?.firstName} {post.User?.lastName}
                                        </p>
                                    </div>
                                    <p className="text-sm">{post.title}</p>
                                </div>
                            </Link>

                        ))}
                    </div>
                    <div className="border-t p-1">
                        <Link href={`/squads/${data?.squadUsername}`}>
                            <Button variant={"ghost"}>
                                Explore More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}