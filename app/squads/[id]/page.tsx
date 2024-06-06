import prisma from "@/app/lib/db";
import Image from "next/image";

async function getData(id: string){
    const data = await prisma.squad.findUnique({
        where:{
            id:id
        },
        select: {
            name: true,
            description: true,
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
    const data = await getData(params.id);
    return (
        <div>
            <p>{data?.User?.profileImage}</p>
            <Image src={data?.User?.profileImage as string} alt="UserImage" width={50} height={50} /> 
        </div>
    )
}