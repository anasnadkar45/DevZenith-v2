import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div>
            <Skeleton className="h-10 w-full mt-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                <Skeleton className="min-h-[200px] " />
                <Skeleton className="min-h-[200px] " />
                <Skeleton className="min-h-[200px] " />
                <Skeleton className="min-h-[200px] " />
                <Skeleton className="min-h-[200px] " />
                <Skeleton className="min-h-[200px] " />
            </div>
        </div>
    )
}