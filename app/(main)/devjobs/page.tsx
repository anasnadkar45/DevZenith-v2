import PostJob from "@/app/components/dev-jobs/PostJob";
import { amaranth } from "@/app/layout";
import { cn } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

export default async function DevJobsPage({
    params,
}: {
    params: { category: string };
}) {
    noStore();
    return (
        <div>
            <div className="w-full flex justify-between my-2">
                <h1 className={cn(amaranth.className, "text-2xl font-bold")}><span className="text-primary">Browse</span> DevJobs</h1>
                <PostJob />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">

            </div>
        </div>
    );
}
