import CreateRoom from "@/app/components/dev-rooms/CreateRoom";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { cn } from "@/lib/utils";
import { amaranth } from "@/app/layout";
import { DevRoomCard, iRoomProps } from "@/app/components/dev-rooms/DevRoomCard";
import { SearchIcon } from "lucide-react";
import { SearchBar } from "@/app/components/dev-rooms/SearchBar";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import LoadMore from "@/app/(main)/devrooms/browse/LoadMore";
import { getRoomData } from "./action";

export default async function BrowsePage({
    searchParams,
}: {
    searchParams: {
        search: string;
    };
}) {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getRoomData(searchParams.search || "",0,3);

    return (
        <div>
            <div className="w-full flex justify-between my-2">
                <h1 className={cn(amaranth.className, "text-2xl font-bold")}><span className="text-primary">Browse</span> DevRooms</h1>
                <CreateRoom />
            </div>
            <SearchBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                <Suspense fallback={<p>Loading feed...</p>}>
                    {data.map((item:iRoomProps , index:number) => (
                        <DevRoomCard key={item.id} room={item} index={index}/>
                    ))}
                </Suspense>
            </div>
            <LoadMore search={searchParams.search || ""} />
        </div>
    );
}
