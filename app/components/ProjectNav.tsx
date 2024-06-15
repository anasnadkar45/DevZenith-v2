import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export const TabLinks = [
    { name: "Search", href: "/project/search", },
    { name: "Joined", href: "/project/joined", },
    { name: "MyProject", href: "/project/myproject", },
]

export function ProjectNav() {
    return (
        <div className="w-full flex justify-center">
            <Tabs defaultValue="Search" className=" border rounded-md">
                <TabsList className="grid w-full grid-cols-3 bg-card " >
                    {
                        TabLinks.map((link , index) => (
                            <Link href={link.href}>
                                <TabsTrigger className="shadow-lg" value={link.name}>{link.name}</TabsTrigger>
                            </Link>
                        ))
                    }
                </TabsList>
            </Tabs>
        </div>
    )
}