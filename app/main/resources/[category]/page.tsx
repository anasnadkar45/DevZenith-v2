import prisma from "@/app/lib/db";
import { type CategoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { ResourceCard } from "@/app/components/ResourceCard";
import { ResourceCategoryLinks } from "@/app/components/ResourceCategoryLinks";

async function getData(category: string) {
    let input;

    switch (category) {
        case "frontend": {
            input = "frontend";
            break;
        }
        case "backend": {
            input = "backend";
            break;
        }
        case "devops": {
            input = "devops";
            break;
        }
        case "all": {
            input = "all";
            break;
        }
        default: {
            return notFound();
        }
    }

    const data = await prisma.resource.findMany({
        where: {
            category: input as CategoryTypes,
        },
        select: {
            id: true,
            image: true,
            description: true,
            name: true,
            url: true,
            category: true,
        },
    });

    return data;
}

export default async function CategoryPage({
    params,
}: {
    params: { category: string };
}) {
    noStore();
    const data = await getData(params.category);
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-primary">Resources</h1>
                <p className="text-muted-foreground">Popular Resources</p>
            </div>

            <div className="flex mt-2 gap-2">
                <ResourceCategoryLinks />
            </div>
            <section className="">
                <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
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
            </section>
        </div>

    );
}