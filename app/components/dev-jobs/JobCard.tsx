import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { ArrowRightIcon, GithubIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JSONContent } from "@tiptap/react";
import { JsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { FaBusinessTime } from "react-icons/fa";

export interface iJobProps {
    id: string,
    name: string,
    location: string,
    logo: string,
    batches: string[],
    role: string,
    roledescription: JsonValue,
    jobtype: string,
    salary: string | null,
    link: string,
    duration: string,
    User: {
        firstName: string,
        lastName: string,
        profileImage: string,
    } | null,
}




interface Prop {
    job: iJobProps;
    index: number;
}

export function JobCard({ job }: Prop) {
    return (
        <Card key={job.id} className="min-h-[250px] relative">
            <CardHeader >
                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center w-14 h-14 border-2 border-primary bg-white rounded-md overflow-hidden">
                        <Image
                            src={job.logo || "/default-logo.png"} // Fallback logo
                            alt={`${job.name} Logo`}
                            width={70}
                            height={70}
                            className="object-cover rounded-md" // Ensure all images have the same size
                        />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="font-bold">{job.role}</CardTitle>
                        <div className="flex gap-4">
                            <p className="text-slate-400">{job.name}</p>
                            <Badge className="w-fit rounded-sm">{job.jobtype}</Badge>
                        </div>
                    </div>
                </div>
                <div className="w-full space-x-2">
                    {job.batches.map((batch) => (
                        <Badge className="w-fit bg-muted text-muted-foreground rounded-sm">{batch}</Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="space-y-2 -mt-4">
                <div className="flex gap-2">
                    <div className="flex gap-2 items-center">
                        <IoLocationOutline size={20}/>
                        <p>{job.location}</p>
                    </div>
                    |
                    <div className="flex gap-2 items-center">
                        <FaBusinessTime size={20}/>
                        <p>{job.duration}</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}