import { Sidebar } from "@/app/components/project/myproject/Sidebar";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-between h-full w-full mt-2 gap-1">
            <div className=" h-[81vh] w-full border rounded-lg p-2">
                {children}
            </div>
            <div className="h-[81vh] bg-card border rounded-lg p-1">
                <Sidebar />
            </div>
        </div>
    );
}
