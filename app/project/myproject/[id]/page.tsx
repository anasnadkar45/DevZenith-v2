import { MembershipRequest } from "@/app/components/project/MembershipRequest";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

    return (
        <div className="flex justify-between">
            <h1>{data?.name}</h1>

            <div className="bg-card border p-3 rounded-lg space-y-2 shadow-md">
                <h2 className="text-2xl font-bold">Membership Requests</h2>
                {data?.MembershipRequests.length as number > 0 ? (
                    <ul>
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