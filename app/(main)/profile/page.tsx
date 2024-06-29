import prisma from "@/app/lib/db"

async function getData(){
    const data = await prisma.squadPost.findMany()
}
export default async function Profile(){
    return(
        <div>
            
        </div>
    )
}