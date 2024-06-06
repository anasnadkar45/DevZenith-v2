import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getData(id: string){
    const data = await prisma.squad.findUnique({
        where:{
            id:id
        },
        select: {
            name: true,
            id:true,
            description: true,
            username: true,
            image: true,
            userId:true,
            createdAt:true,
            User:true
        },
        
    })

    return data 
}
export default async function SquadRoutePage({
    params,
}: {
    params: { id: string };
}) {
    const {getUser} = getKindeServerSession()
    const user = await getUser();
    const data = await getData(params.id);
    return (
        <div>
            <Button asChild>
                <Link href={user?.id ? `/squads/${data?.id}/create`:"/api/auth/login"}>
                    Create Post
                </Link>
            </Button>
        </div>
    )
}