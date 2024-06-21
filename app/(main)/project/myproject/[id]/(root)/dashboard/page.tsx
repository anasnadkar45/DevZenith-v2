import { MembershipRequest } from "@/app/components/project/MembershipRequest";
import prisma from "@/app/lib/db";
import { Calendar } from "@/components/ui/calendar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import React from "react";

async function getData(id: string) {
    const data = await prisma.project.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
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
    // const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <div className="grid grid-cols-8 grid-rows-6 gap-1">
            <h1 className="max-lg:col-span-8 xl:col-span-6 xl:row-span-3 border rounded-md">{data?.name}</h1>

            <Calendar
                mode="single"
                className="rounded-md border xl:col-span-2 xl:row-span-3 h-full"
            />

            <div className="xl:col-span-3 xl:row-span-3 border h-full rounded-md">

            </div>

            <div className="xl:col-span-3 xl:row-span-3 border h-full rounded-md p-2">
                <h1 className="font-bold text-xl mb-3">Project Team</h1>
                {data?.ProjectMemberships.map((member) => (
                    <div key={member.User?.id}>
                        <div className="flex gap-2 items-center">
                            <Image src={member.User?.profileImage as string} alt="" width={50} height={50}
                                className="rounded-md border"
                            />
                            <p >{member.User?.firstName} {member.User?.lastName}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-card border p-3 h-full rounded-lg space-y-2 shadow-md xl:col-span-2 xl:row-span-3">
                <h2 className="text-xl font-bold">Membership Requests</h2>
                {data?.MembershipRequests.length as number > 0 ? (
                    <ul className="h-[40vh] overflow-y-scroll scroll-smooth">
                        {
                            data?.MembershipRequests.map((request, index) => (
                                <MembershipRequest
                                    key={request?.id}
                                    id={request?.id}
                                    status={request?.status}
                                    firstName={request?.User?.firstName as string}
                                    lastName={request?.User?.lastName as string}
                                    email={request?.User?.email as string}
                                    profileImage={request?.User?.profileImage as string}
                                />
                            ))
                        }
                    </ul>

                ) : (
                    <p>No membership requests found.</p>
                )}
            </div>
        </div>
    )
}