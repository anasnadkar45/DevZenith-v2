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
                select: {
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
        <div>
            <h1>{data?.name}</h1>
            <h2>Membership Requests</h2>
            {data?.MembershipRequests.length as number > 0 ? (
                <ul>
                    {data?.MembershipRequests.map((request, index) => (
                        <li key={index}>
                            <img src={request.User?.profileImage} alt={`${request.User?.firstName}'s profile`} width={50} height={50} />
                            <p>{request.User?.firstName} {request.User?.lastName}</p>
                            <p>{request.User?.email}</p>
                            <p>Status: {request.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No membership requests found.</p>
            )}
        </div>
    )
}