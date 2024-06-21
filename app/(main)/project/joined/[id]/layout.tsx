import { Sidebar } from "@/app/components/project/joined/Sidebar";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-between h-full w-full mt-2 gap-1">
            <div className=" min-h-[85vh] w-full border rounded-lg p-2">
                {children}
            </div>
            <div className="h-[85vh] bg-card border rounded-lg p-1 hidden flex-col md:flex">
                <Sidebar />
            </div>
        </div>
    );
}
