import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div>
            <div className="flex-col xl:grid xl:grid-cols-4 h-full space-y-4 xl:space-x-4 md:pr-0">
                <Skeleton className="min-h-[800px] lg:col-span-3" />
                <Skeleton className="min-h-[400px] " />
            </div>
        </div>

    )
}