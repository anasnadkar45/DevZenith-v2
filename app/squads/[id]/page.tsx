import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getData(username: string){
    const data = await prisma.squad.findUnique({
        where:{
            username:username
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
    console.log(data)
    return (
        <div>
            <Button asChild>
                <Link href={user?.id ? `/squads/${data?.username}/create`:"/api/auth/login"}>
                    Create Post
                </Link>
            </Button>
        </div>
    )
}