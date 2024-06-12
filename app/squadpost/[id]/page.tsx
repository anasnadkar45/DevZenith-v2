import { PostDescription } from "@/app/components/PostDescription";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidCommentDots } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import { FaArrowCircleDown, FaArrowCircleUp, FaWhatsapp } from "react-icons/fa";
import { FaShare, FaXTwitter } from "react-icons/fa6";
import { HiMiniArrowLeftEndOnRectangle } from "react-icons/hi2";
import { IoBookmark } from "react-icons/io5";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaAngleRight } from "react-icons/fa";
import { handleVote } from "@/app/actions";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CopyLink } from "@/app/components/CopyLink";
import { useState } from "react";
import { SquadCardBottom } from "@/app/components/SquadCardBottom";
import { TypeOfVote } from "@prisma/client";

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
            Vote: {
                select: {
                    voteType: true,
                    User: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profileImage: true,
                        }
                    }
                }
            },
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                    Vote:{
                        select:{
                            voteType: true,
                        }
                    }
                }
            },
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
        <div className="flex-col xl:grid xl:grid-cols-4 h-full space-y-4 md:space-x-4 pr-3 md:pr-0">
            <div className="lg:col-span-3 w-full mx-auto space-y-2 bg-card rounded-lg p-2">
                <Link href={`/squads/${data?.squadUsername}`}>
                    <Button variant={"outline"}>
                        <HiMiniArrowLeftEndOnRectangle size={20} />
                    </Button>
                </Link>
                <div className="flex items-center gap-3">
                    <Image src={data?.Squad?.image as string} alt="squad image" width={80} height={50} className="border rounded-lg" />
                    <p className="text-slate-400">{data?.squadUsername}</p>
                </div>
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
                            alt="post image"
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

                <div>
                    <Dialog>
                        <DialogTrigger>
                            <p className="flex items-center space-x-1">
                                <span>
                                    {data?.Vote.reduce((acc, vote) => {
                                        if (vote.voteType === "UP") return acc + 1;
                                        if (vote.voteType === "DOWN") return acc - 1;
                                        return acc;
                                    }, 0)}
                                </span>
                                <span>Upvotes</span>
                            </p>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upvoted by</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="">
                                {
                                    data?.Vote.filter(vote => vote.voteType === "UP").map((vote, index) => (
                                        <li key={index} className="flex items-center gap-2 p-2 bg-card rounded-md mb-1">
                                            {vote.User?.profileImage && (
                                                <Image
                                                    src={vote.User.profileImage}
                                                    alt={`${vote.User.firstName} ${vote.User.lastName}`}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-lg border-2"
                                                />
                                            )}
                                            <span>{vote.User?.firstName} {vote.User?.lastName}</span>
                                        </li>
                                    ))
                                }
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>


                </div>

                {/* <form action={handleVote}>
                            <input type="hidden" name="voteDirection" value="DOWN" />
                            <input type="hidden" name="squadPostId" value={data?.id} />
                            <Button variant={"ghost"}>
                                <FaArrowCircleDown className="text-slate-300" size={20} />
                            </Button>
                        </form> */}

                {/* <div className="flex justify-between items-center border p-2 rounded-xl">
                    <div className="flex border rounded-md p-1">
                        <form action={handleVote}>
                            <input type="hidden" name="voteDirection" value="UP" />
                            <input type="hidden" name="squadPostId" value={data?.id} />
                            <Button variant={"ghost"} className="space-x-2 group hover:bg-green-400/40 transition-all hover:duration-150">
                                <FaArrowCircleUp className="text-slate-300 group-hover:text-green-400 transition-all hover:duration-150" size={20} />
                                <span className="group-hover:text-green-400 text-slate-400 font-bold text-lg">Upvote</span>
                            </Button>
                        </form>

                        

                    </div>

                    <Button variant={"ghost"} className="flex items-center gap-2 group hover:bg-blue-400/40 transition-all hover:duration-150">
                        <BiSolidCommentDots className="text-slate-300 group-hover:text-blue-400 transition-all hover:duration-150" size={20} />
                        <p className="group-hover:text-blue-400 text-slate-400 font-bold text-lg">Comment</p>
                    </Button>
                    <Button variant={"ghost"} className="flex items-center gap-2 group hover:bg-orange-400/40 transition-all hover:duration-150">
                        <IoBookmark className="text-slate-300 group-hover:text-orange-400 transition-all hover:duration-150" size={20} />
                        <p className="group-hover:text-orange-400 text-slate-400 font-bold text-lg">Bookmark</p>
                    </Button>
                    <CopyLink id={params.id}/>
                </div> */}
                <SquadCardBottom id={data?.id as string}  />
            </div>
            <div className="space-y-4">
                <div className="border p-2 rounded-lg ">
                    <p className="text-slate-400">Post created by</p>
                    <div className="flex items-center gap-2">
                        {data?.User?.profileImage && (
                            <Image src={data?.User?.profileImage}
                                alt={"user"}
                                width={40}
                                height={40}
                                className="rounded-xl border-2 "
                            />
                        )}
                        <p className="text-slate-500">
                            {data?.User?.firstName} {data?.User?.lastName}
                        </p>
                    </div>

                </div>
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
                    <p className="text-center border-b py-2 text-slate-400">More posts from @{data?.squadUsername}</p>
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
                            <Button variant={"ghost"} className="flex gap-2">
                                <p>Explore More</p>
                                <FaAngleRight size={25} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}