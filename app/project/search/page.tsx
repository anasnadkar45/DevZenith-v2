// app/project/search/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import SearchPageClient from "@/app/components/project/search/SearchPageClient";

async function getData(userId: string | undefined) {
    const data = await prisma.project.findMany({
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            name: true,
            description: true,
            logo: true,
            tags: true,
            url: true,
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                }
            },
            MembershipRequests: {
                where: {
                    userId: userId
                },
                select: {
                    status: true,
                }
            },
            createdAt: true,
        }
    });

    return data.map(project => ({
        ...project,
        membershipRequestStatus: project.MembershipRequests.length > 0
            ? project.MembershipRequests[0].status
            : null
    }));
}

export default async function SearchPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    const projects = await getData(userId);

    return <SearchPageClient projects={projects} />;
}
