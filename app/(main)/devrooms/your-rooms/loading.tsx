import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="space-y-2 mt-4">
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                <Skeleton className="min-h-[250px] " />
                <Skeleton className="min-h-[250px] " />
                <Skeleton className="min-h-[250px] " />
                <Skeleton className="min-h-[250px] " />
                <Skeleton className="min-h-[250px] " />
                <Skeleton className="min-h-[250px] " />
            </div>
        </div>
    )
}