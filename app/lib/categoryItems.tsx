import { ReactNode } from "react";

interface iAppProps {
    name: string;
    title: string;
    // image: ReactNode;
    id: number;
}

export const categoryItems : iAppProps[] = [
    {
        id: 0,
        name: "frontend",
        title: "Frontend",
    },
    {
        id: 1,
        name: "backend",
        title: "Backend",
    },
    {
        id: 2,
        name: "devops",
        title: "Devops",
    },
]