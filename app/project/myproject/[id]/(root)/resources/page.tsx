import AddResources from "@/app/components/project/myproject/AddResources";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getData(id: string) {
    const data = await prisma.project.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
        }
    })

    return data;
}

export default async function ResourcesPage(
    {
        params,
    }: {
        params: { id: string }
    }
) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()
    const data = await getData(params.id)
    return (
        <div>
            <div className="flex justify-between">
                <p className="text-2xl font-bold">Resource's</p>
                <AddResources id={data?.id ?? ""} />
            </div>
        </div>
    )
}