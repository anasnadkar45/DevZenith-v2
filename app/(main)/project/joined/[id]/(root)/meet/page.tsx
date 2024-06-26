import { SearchBar } from "@/app/components/dev-rooms/SearchBar";
import { ProjectMeetCard } from "@/app/components/project/joined/ProjectMeetCard";
import CreateProjectMeet from "@/app/components/project/myproject/CreateProjectMeet";
import { amaranth } from "@/app/layout";
import prisma from "@/app/lib/db";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";

export async function getRoomData(userId: string,projectId:string) {
    const data = await prisma.projectMeet.findMany({
        where: {
            projectId:projectId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            url: true,
            tags: true,
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

export default async function ProjectMeetPage({
    params,
}: {
    params: {
        search: string;
        id: string;
    };
}) {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id as string;
    const projectId = params.id as string;

    // Handle case where userId might be undefined
    if (!userId) {
        return <div>No user ID found.</div>;
    }

    const meetingData = await getRoomData(userId, projectId);
    console.log(meetingData);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <Suspense fallback={<p>Loading feed...</p>}>
                    {meetingData.map((meeting) => (
                        <ProjectMeetCard
                            key={meeting.id}
                            id={meeting.id}
                            projectId={projectId}
                            name={meeting.name}
                            tags={meeting.tags as [string]} // Cast to string[]
                            description={meeting.description ?? "No description available"}
                            url={meeting.url ?? ""}
                            firstName={meeting.User?.firstName ?? ""}
                            lastName={meeting.User?.lastName ?? ""}
                            profileImage={meeting.User?.profileImage ?? ""}
                        />
                    ))}
                </Suspense>
            </div>
        </div>

    );
}
