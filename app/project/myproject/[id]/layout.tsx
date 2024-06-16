import { Sidebar } from "@/app/components/project/myproject/Sidebar";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-8 h-full w-full mt-2 gap-1">
            <div className="col-span-7 h-[81vh] border rounded-lg p-1">
                {children}
            </div>
            <div className="h-[81vh] bg-card border rounded-lg p-1">
                <Sidebar />
            </div>
        </div>
    );
}
