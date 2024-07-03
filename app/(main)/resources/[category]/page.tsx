import { unstable_noStore as noStore } from "next/cache";
import { ResourceCard, iResourceProps } from "@/app/components/ResourceCard";
import { ResourceCategoryLinks } from "@/app/components/ResourceCategoryLinks";
import { getResourceData } from "./action";
import LoadMore from "./LoadMore";
import { Suspense } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UnauthorizedUser } from "@/app/components/UnauthorizedUser";
import prisma from "@/app/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getUserRole(id: string){
    const data = await prisma.user.findUnique({
        where:{
            id: id,
        },
        select:{
            role:true,
        }
    })
    return data;
}

export default async function CategoryPage({
    params,
}: {
    params: { category: string };
}) {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id as string;
    const userRole = await getUserRole(userId);
    if (!user) {
        // If the user is not logged in
        return (
            <UnauthorizedUser title="Login to access the all the resources" />
        );
    }
    const initialData = await getResourceData(params.category, 0, 3); // Fetch the initial page of data
    return (
        <div>
            <div className=" w-full flex justify-between">
                <h1 className="text-3xl font-bold text-primary">Resources</h1>
                {userRole?.role === 'ADMIN' && (
                    <Link href={'/new-resource'}>
                        <Button size={"sm"}>
                            Add Resources
                        </Button>
                    </Link>
                )}
            </div>
            <div className="flex justify-center mt-2 mx-auto">
                <ResourceCategoryLinks />
            </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
                <Suspense fallback={<p>Loading feed...</p>}>
                    {initialData.map((item: iResourceProps, index: number) => (
                        <ResourceCard key={item.id} resource={item} index={index} />
                    ))}
                </Suspense>
            </div> */}
            <Suspense fallback={<p>Loading feed...</p>}>
                <LoadMore category={params.category} initialData={initialData} />
            </Suspense>
        </div>
    );
}
