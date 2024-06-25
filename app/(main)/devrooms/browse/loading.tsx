import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Skeleton className="min-h-[300px] " />
            <Skeleton className="min-h-[300px] " />
            <Skeleton className="min-h-[300px] " />
            <Skeleton className="min-h-[300px] " />
            <Skeleton className="min-h-[300px] " />
            <Skeleton className="min-h-[300px] " />
        </div>
    )
}