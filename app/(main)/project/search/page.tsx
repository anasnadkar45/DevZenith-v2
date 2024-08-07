// app/project/search/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import SearchPageClient from "@/app/components/project/search/SearchPageClient";
import { unstable_noStore } from "next/cache";
import { UnauthorizedUser } from "@/app/components/UnauthorizedUser";
import { Suspense } from "react";

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
            ProjectMemberships: {
                select: {
                    User: {
                        select: {
                            _count: true
                        }
                    }
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
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;
    if (!user) {
        // If the user is not logged in
        return (
            <UnauthorizedUser title="Unleashing the magic of developer project with Project Collab. An opportunity to collaborate together with like-minded devs." />
        );
    }

    const projects = await getData(userId);

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            <SearchPageClient projects={projects} />
        </Suspense>
        
    );
}
