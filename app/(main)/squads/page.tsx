import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoginLink, RegisterLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../lib/db";
import Image from "next/image";
import Link from "next/link";
import { SquadCard } from "../../components/SquadCard";
import { Suspense } from "react";
import AddSquad from "./create/page";
import { unstable_noStore } from "next/cache";
import Error from '../../../public/Unauthorized1.svg'
import { UnauthorizedUser } from "@/app/components/UnauthorizedUser";

// Function to get squad data
async function getData() {
    return prisma.squad.findMany({
        select: {
            id: true,
            name: true,
            username: true,
            image: true,
            description: true,
            createdAt: true,
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                },
            },
        },
    });
}

export default async function Squads() {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        // If the user is not logged in
        return (
            <UnauthorizedUser title="Unleashing the magic of developer communities with Squads. An opportunity to dive deep and go niche together with like-minded devs."/>
        );
    }

    const data = await getData();

    return (
        <div>
            <div>
                <div className="w-full flex justify-between mb-2">
                    <h1 className="text-3xl font-bold"><span className="text-primary">Dev</span>Squads</h1>
                    <AddSquad />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
                    <Suspense fallback={<p>Loading feed...</p>}>
                        {data.map((squad) => (
                            <SquadCard
                                key={squad.id}
                                id={squad.username}
                                name={squad.name}
                                image={squad.image}
                                description={squad.description}
                                createdAt={squad.createdAt}
                                username={squad.username}
                                User={squad.User} // Pass User, which can be null
                            />
                        ))}
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
