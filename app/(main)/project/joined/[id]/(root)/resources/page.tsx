import { DataTableDemo } from "@/app/components/project/myproject/DataTableDemo";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";

export async function getData(id: string) {
    const data = await prisma.project.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            ProjectResources: {
                select: {
                    id: true,
                    name: true,
                    category: true,
                    file: true,
                    link: true,
                }
            }
        }
    })

    return data;
}
export default async function ResourcesPage({
    params
}: {
    params: { id: string }
}) {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(params.id);
    const resources = data?.ProjectResources ?? [];
    return (
        <div>
            {
                user ? (
                    <div>
                        <h1 className="text-2xl font-bold"><span className="text-primary">Your</span> Resources</h1>
                        <DataTableDemo data={resources as []} />
                    </div>
                ) : (
                    <div>You are not loged in or Authorized</div>
                )
            }

        </div>
    )
}