import { ProjectSettingsCard } from "@/app/components/project/myproject/ProjectSettingsCard";
import { amaranth } from "@/app/layout";
import prisma from "@/app/lib/db";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";

export async function getProjectData(id: string) {
    const data = await prisma.project.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            description: true,
            logo: true,
            tags: true,
            url: true,
        }
    })
    return data;
}

export default async function SettingsPage({ params }: { params: { id: string } }) {
    unstable_noStore();
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const projectData = await getProjectData(params.id)
    return (
        <div>
            <h1 className={cn(amaranth.className, "text-2xl font-bold mb-4")}><span className="text-primary">Project</span> Settings</h1>
            <ProjectSettingsCard
                id={projectData?.id as string}
                name={projectData?.name as string}
                logo={projectData?.logo as string}
                description={projectData?.description as string}
                tags={projectData?.tags as [string]}
                url={projectData?.url as string}
            />
        </div>
    )
}