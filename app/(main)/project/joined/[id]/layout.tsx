import { SideNav } from "@/app/components/project/joined/SideNav";
import { Sidebar } from "@/app/components/project/joined/Sidebar";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex justify-between h-full w-full mt-2 gap-1">
            <div className=" min-h-screen w-full border rounded-lg p-2">
                {children}
            </div>
            <div className="hidden md:flex h-[85vh] bg-card border rounded-lg p-1">
                <Sidebar />
            </div>
            <div className="flex md:hidden absolute right-0 -top-12">
                <SideNav />
            </div>
        </div>
    );
}
