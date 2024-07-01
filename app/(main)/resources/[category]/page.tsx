import { unstable_noStore as noStore } from "next/cache";
import { ResourceCard, iResourceProps } from "@/app/components/ResourceCard";
import { ResourceCategoryLinks } from "@/app/components/ResourceCategoryLinks";
import { getResourceData } from "./action";
import LoadMore from "./LoadMore";
import { Suspense } from "react";

export default async function CategoryPage({
    params,
}: {
    params: { category: string };
}) {
    noStore();
    const initialData = await getResourceData(params.category, 0, 3); // Fetch the initial page of data
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-primary">Resources</h1>
                <p className="text-muted-foreground">Popular Resources</p>
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
            <LoadMore category={params.category} initialData={initialData} />
        </div>
    );
}
