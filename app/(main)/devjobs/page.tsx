import {JobCard, iJobProps } from "@/app/components/dev-jobs/JobCard";
import PostJob from "@/app/components/dev-jobs/PostJob";
import { amaranth } from "@/app/layout";
import { cn } from "@/lib/utils";
import { unstable_noStore as noStore, unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { getJobData } from "./action";
import LoadMore from "./LoadMore";
import { SearchBar } from "@/app/components/dev-jobs/SearchBar";

export default async function DevJobsPage({
    params,
}: {
    params: { search: string };
}) {
    unstable_noStore();
    const data = await getJobData(params.search || "",0,3);
    return (
        <div>
            <div className="w-full flex justify-between my-2">
                <h1 className={cn(amaranth.className, "text-2xl font-bold")}><span className="text-primary">Browse</span> DevJobs</h1>
                <PostJob />
            </div>
            <SearchBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mt-2">
                <Suspense fallback={<p>Loading feed...</p>}>
                    {data.map((item: iJobProps, index: number) => (
                        <JobCard key={item.id} job={item} index={index} />
                    ))}
                </Suspense>
            </div>
            <LoadMore search={params.search || ""} />
        </div>
    );
}
