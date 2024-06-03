import { ResourceCard } from "@/app/components/ResourceCard";
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";

async function getData() {
    const data = await prisma.resource.findMany({
        select: {
            name: true,
            category: true,
            description: true,
            image: true,
            url: true,
            id: true,
        }
    });
    return data;
}
export default async function ResourcesPage() {
    noStore();
    const data = await getData();
    // console.log(data);
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-primary">Resources</h1>
                <p className="text-muted-foreground">Popular Resources</p>
            </div>

            <div className="flex mt-2 gap-2">
                <div className="py-1 px-4 border-2 border-primary rounded-lg">All</div>
                <div className="py-1 px-4 border-2 rounded-lg">Frontend</div>
                <div className="py-1 px-4 border-2 rounded-lg">Backend</div>
                <div className="py-1 px-4 border-2 rounded-lg">Devops</div>
                <div className="py-1 px-4 border-2 rounded-lg">DSA</div>
            </div>

            <div className="grid gird-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10 mb-6">
                {data.map((resource) => (
                    <ResourceCard
                        key={resource.id}
                        id={resource.id}
                        name={resource.name}
                        image={resource.image}
                        description={resource.description}
                        category={resource.category}
                        url={resource.url}
                    />
                ))}
            </div>
        </div>
    )
}