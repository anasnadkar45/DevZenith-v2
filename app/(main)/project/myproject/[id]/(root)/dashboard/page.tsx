import { MembershipRequest } from "@/app/components/project/MembershipRequest";
import prisma from "@/app/lib/db";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiDownload } from "react-icons/fi"; // Import the download icon

async function getData(id: string) {
    const data = await prisma.project.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            description: true,
            logo: true,
            url: true,
            tags: true,
            ProjectResources: {
                select: {
                    id: true,
                    name: true,
                    link: true,
                    file: true,
                }
            },
            tasks: {
                select: {
                    id: true,
                    title: true,
                    status: true,
                    User: {
                        select: {
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            },
            MembershipRequests: {
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    id: true,
                    User: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            profileImage: true,
                        }
                    },
                    status: true
                }
            },
            ProjectMemberships: {
                select: {
                    User: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            profileImage: true,
                        }
                    }
                }
            }
        }
    });

    return data;
}

export default async function MyProjectRoute({
    params,
}: {
    params: { id: string }
}) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(params.id);

    // Calculate progress
    const totalTasks = data?.tasks.length || 0;
    const completedTasks = data?.tasks.filter(task => task.status === 'DONE').length || 0;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <main className="flex flex-col flex-1 gap-2">
            {/* Project Details Card */}
            <Card className="w-full lg:col-span-1 shadow-md">
                <div className="p-6">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Project Details</h3>
                </div>
                <CardContent className="p-6 space-y-4">
                    {/* {data?.logo && (
                        <div className="flex justify-center">
                            <Image
                                src={data?.logo}
                                alt={`${data?.name} logo`}
                                width={100}
                                height={100}
                                className="rounded-full border"
                            />
                        </div>
                    )} */}
                    <div>
                        <div className="font-medium">Project Name</div>
                        <div>{data?.name}</div>
                    </div>
                    <div>
                        <div className="font-medium">Description</div>
                        <div>{data?.description}</div>
                    </div>
                    {/* Placeholder for dates, assuming data.startDate and data.endDate are available */}
                    <div>
                        <div className="font-medium">Start Date</div>
                        <div>{/* Assuming startDate is available in data */}</div>
                    </div>
                    <div>
                        <div className="font-medium">End Date</div>
                        <div>{/* Assuming endDate is available in data */}</div>
                    </div>
                    <div>
                        <div className="font-medium">Progress</div>
                        <div className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                            <div>{progressPercentage.toFixed(2)}%</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Other Cards Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {/* Team Members Card */}
                <Card className="lg:col-span-2 shadow-md">
                    <CardHeader>
                        <CardTitle>Project Team</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {data?.ProjectMemberships.map((member) => (
                            <div key={member.User?.id} className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={member.User?.profileImage || "/placeholder-user.jpg"} />
                                    <AvatarFallback>{member.User?.firstName?.[0]}{member.User?.lastName?.[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{member.User?.firstName} {member.User?.lastName}</div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Project Resources Card */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Project Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {data?.ProjectResources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{resource.name}</div>
                                    {resource.link && (
                                        <Link href={resource.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                            View Resource
                                        </Link>
                                    )}
                                </div>
                                {resource.file && (
                                    <Link href={resource.file} target="_blank" rel="noopener noreferrer">
                                        <FiDownload className="text-blue-600 hover:text-blue-800" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Tasks Card */}
                <Card className="lg:col-span-2 shadow-md">
                    <CardHeader>
                        <CardTitle>Assigned Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {data?.tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{task.title}</div>
                                    <div className="text-muted-foreground text-sm">
                                        Assigned to {task.User?.firstName} {task.User?.lastName}
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    task.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-600" :
                                    task.status === "DONE" ? "bg-green-100 text-green-600" :
                                    task.status === "TODO" ? "bg-yellow-100 text-yellow-600" :
                                    "bg-gray-100 text-gray-600"
                                }`}>
                                    {task.status}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Calendar Card */}
                {/* <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Project Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            className="p-0 [&_td]:w-8 [&_td]:h-8 [&_th]:w-8 [&_[name=day]]:w-8 [&_[name=day]]:h-8 [&>div]:space-x-0 [&>div]:gap-4"
                        />
                    </CardContent>
                </Card> */}

                {/* Membership Requests */}
                <Card className="lg:col-span-1 shadow-md">
                    <CardHeader>
                        <CardTitle>Membership Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {data?.MembershipRequests.length as number > 0 ? (
                            <ul className="h-[40vh] overflow-y-scroll scroll-smooth">
                                {data?.MembershipRequests.map((request) => (
                                    <MembershipRequest
                                        key={request?.id}
                                        id={request?.id}
                                        status={request?.status}
                                        firstName={request?.User?.firstName as string}
                                        lastName={request?.User?.lastName as string}
                                        email={request?.User?.email as string}
                                        profileImage={request?.User?.profileImage as string}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p>No membership requests found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
