import AddResources from "@/app/components/project/myproject/AddResources";
import { DataTableDemo } from "@/app/components/project/myproject/DataTableDemo";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";

async function getData(id: string) {
  const data = await prisma.project.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      ProjectResources: {
        select: {
          id: true,
          name: true,
          category: true,
          file: true,
          link: true,
          projectId: true,
        }
      }
    }
  })

  return data;
}

export default async function ResourcesPage(
  { params }: { params: { id: string } }
) {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(params.id);
  const resources = data?.ProjectResources ?? [];

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-2xl font-bold"><span className="text-primary">Project</span> Resources</p>
        <AddResources id={data?.id ?? ""} />
      </div>
      <DataTableDemo data={resources} />
    </div>
  );
}
