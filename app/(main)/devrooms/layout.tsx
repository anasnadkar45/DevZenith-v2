import { DevRoomNav } from "@/app/components/dev-rooms/DevRoomNav";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <DevRoomNav />
            {children}
        </div>
    );
}
