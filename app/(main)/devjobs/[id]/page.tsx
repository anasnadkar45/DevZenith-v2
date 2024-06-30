import { PostDescription } from "@/app/components/PostDescription";
import prisma from "@/app/lib/db";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { JSONContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { FaBusinessTime } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { SquareMousePointer } from "lucide-react";

async function getJobData(id: string) {
    const data = await prisma.job.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            location: true,
            logo: true,
            batches: true,
            role: true,
            roledescription: true,
            jobtype: true,
            salary: true,
            link: true,
            duration: true,
            createdAt: true,
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                },
            },
        }
    })
    return data;
}

async function getSimilarJobs(role: string , id:string) {
    const data = await prisma.job.findMany({
        where: {
            role: role,
            id: {
                not: id,
            }
        },
        take: 2,
        orderBy:{
            createdAt:"desc"
        },
        select: {
            id: true,
            name: true,
            location: true,
            logo: true,
            batches: true,
            role: true,
            roledescription: true,
            jobtype: true,
            salary: true,
            link: true,
            duration: true,
            createdAt: true,
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                },
            },
        }
    })
    return data;
}

export default async function JobPage({
    params,
}: {
    params: { id: string };
}) {
    const data = await getJobData(params.id);
    const similarJob = await getSimilarJobs(data?.role as string, params.id);
    return (
        <div className="flex-col xl:grid xl:grid-cols-4 gap-2">
            <div className="xl:col-span-3 border rounded-md bg-card">
                <div className="w-full p-3 space-y-2">
                    <h1 className="text-4xl font-bold">{data?.role}</h1>
                    <div className="flex flex-wrap items-center gap-2">
                        {data?.batches.map((batch) => (
                            <Badge className="w-fit rounded-sm">{batch}</Badge>
                        ))}
                    </div>
                </div>
                <Separator />
                <div className="p-3">
                    <PostDescription content={data?.roledescription as JSONContent} />
                </div>
            </div>
            <div className="mt-2 xl:mt-0 xl:col-span-1 gap-2 space-y-2">
                <div key={data?.id} className="relative bg-card border rounded-md p-3 space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center w-14 h-14 border-2 border-primary bg-white rounded-md overflow-hidden">
                            <Image
                                src={data?.logo || "/default-logo.png"} // Fallback logo
                                alt={`${data?.name} Logo`}
                                width={70}
                                height={70}
                                className="object-cover rounded-md" // Ensure all images have the same size
                            />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="font-bold">{data?.role}</CardTitle>
                            <div className="flex gap-4">
                                <p className="text-slate-400">{data?.name}</p>
                                <Badge className="w-fit rounded-sm">{data?.jobtype}</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="w-full space-x-2">
                        {data?.batches.map((batch) => (
                            <Badge className="w-fit bg-muted text-muted-foreground rounded-sm">{batch}</Badge>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <div className="flex gap-2 items-center">
                                <IoLocationOutline size={20} className="text-blue-500" />
                                <p>{data?.location}</p>
                            </div>
                            |
                            <div className="flex gap-2 items-center">
                                <FaBusinessTime size={20} className="text-orange-500" />
                                <p>{data?.duration}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <RiMoneyRupeeCircleLine size={20} className="text-green-500" />
                            <p>{data?.duration}</p>
                        </div>
                        <p className="text-xs text-slate-400">
                            Posted on:{' '}
                            {data?.createdAt && new Date(data?.createdAt).toLocaleDateString("en-US", {
                                year: 'numeric',
                                month: 'short',
                                day: "numeric"
                            })}
                        </p>
                    </div>
                    <Button className="w-full">
                        <a href={data?.link} target="_blank" className="flex gap-2 items-center justify-center w-full">
                            <p>Apply</p>
                            <SquareMousePointer />
                        </a>
                    </Button>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl">Similar Jobs</h1>
                    {similarJob.map((data)=>(
                        <div key={data?.id} className="relative bg-card border rounded-md p-3 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center w-14 h-14 border-2 border-primary bg-white rounded-md overflow-hidden">
                                <Image
                                    src={data?.logo || "/default-logo.png"} // Fallback logo
                                    alt={`${data?.name} Logo`}
                                    width={70}
                                    height={70}
                                    className="object-cover rounded-md" // Ensure all images have the same size
                                />
                            </div>
                            <div className="space-y-2">
                                <CardTitle className="font-bold">{data?.role}</CardTitle>
                                <div className="flex gap-4">
                                    <p className="text-slate-400">{data?.name}</p>
                                    <Badge className="w-fit rounded-sm">{data?.jobtype}</Badge>
                                </div>
                            </div>
                        </div>
                        <div className="w-full space-x-2">
                            {data?.batches.map((batch) => (
                                <Badge className="w-fit bg-muted text-muted-foreground rounded-sm">{batch}</Badge>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <div className="flex gap-2 items-center">
                                    <IoLocationOutline size={20} className="text-blue-500" />
                                    <p>{data?.location}</p>
                                </div>
                                |
                                <div className="flex gap-2 items-center">
                                    <FaBusinessTime size={20} className="text-orange-500" />
                                    <p>{data?.duration}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <RiMoneyRupeeCircleLine size={20} className="text-green-500" />
                                <p>{data?.duration}</p>
                            </div>
                            <p className="text-xs text-slate-400">
                                Posted on:{' '}
                                {data?.createdAt && new Date(data?.createdAt).toLocaleDateString("en-US", {
                                    year: 'numeric',
                                    month: 'short',
                                    day: "numeric"
                                })}
                            </p>
                        </div>
                        <Button className="w-full">
                            <a href={data.link} target="_blank" className="flex gap-2 items-center justify-center w-full">
                                <p>Apply</p>
                                <SquareMousePointer />
                            </a>
                        </Button>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}