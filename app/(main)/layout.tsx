import BottomBar from "../components/BottomBar";
import { Navbar } from "../components/Navbar";
import { SideBar } from "../components/SideBar";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            <div className="h-screen grid flex-1 md:grid-cols-[200px_1fr] pt-14">
                <aside className="hidden w-[200px] h-full flex-col md:flex">
                    <SideBar />
                </aside>
                <div className="m-3 pb-32 lg:pb-0 lg:m-4 ">
                    {children}
                </div>
                <BottomBar />
            </div>
        </div>
    );
}
