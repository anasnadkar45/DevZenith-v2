import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div>
            <div className="w-full space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-[400px] w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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