import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="mt-2">
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                <Skeleton className="min-h-[400px] " />
                <Skeleton className="min-h-[400px] " />
                <Skeleton className="min-h-[400px] " />
                <Skeleton className="min-h-[400px] " />
                <Skeleton className="min-h-[400px] " />
                <Skeleton className="min-h-[400px] " />
            </div>
        </div>

    )
}