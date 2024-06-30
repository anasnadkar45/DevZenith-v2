import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex-col xl:grid xl:grid-cols-4 gap-2">
            <Skeleton className="xl:col-span-3 border rounded-md bg-card" />
            <div className="mt-2 xl:mt-0 xl:col-span-1 gap-2 space-y-2">
                <Skeleton className="w-full min-h-[250px] " />
                <Skeleton className="w-full min-h-[250px] " />
                <Skeleton className="w-full min-h-[250px] " />
            </div>

        </div>
    )
}