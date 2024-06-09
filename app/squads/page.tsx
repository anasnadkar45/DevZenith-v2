import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import Image from "next/image";
import Link from "next/link";
import { SquadCard } from "../components/SquadCard";

// Define the shape of the squad data expected from the database
interface Squad {
    id: string;
    name: string;
    username: string;
    image: string;
    description: string;
    createdAt: string;
    User?: {
        profileImage: string;
        firstName: string;
    } | null; // Allow User to be null
}

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
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData();

    return (
        <div>
            {user ? (
                <div>
                    <div className="flex justify-between mb-4">
                        <h1 className="text-3xl text-primary font-bold">DevSquads</h1>
                        <Button asChild size={"sm"}>
                            <Link href={'/squads/create'}>
                                Create Squad
                            </Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
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
                    </div>
                </div>

            ) : (
                <Card className="max-w-3xl mx-auto p-4">
                    <h1 className="text-center">
                        Unleashing the magic of developer communities with Squads. An opportunity to dive deep and go niche together with like-minded devs.
                    </h1>
                    <div className="flex justify-center mt-4">
                        <Button>
                            Login to view squads
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
