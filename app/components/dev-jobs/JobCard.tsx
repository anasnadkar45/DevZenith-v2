import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { ArrowRightIcon, GithubIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JSONContent } from "@tiptap/react";
import { JsonValue } from "@prisma/client/runtime/library";

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
            <CardHeader>
                <CardTitle className="font-bold">{job.name}</CardTitle>
                <Badge className="inline-block">{job.jobtype}</Badge>
            </CardHeader>
            {/* <CardContent>
                <div className="space-y-2">
                    <div className="space-y-2">
                        <Link href={room.url as string} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                            <GithubIcon className="w-5 h-5" />
                            <p>Github Url</p>
                        </Link>
                        <div className="flex flex-wrap gap-2">
                            {room.tags.map((tag) => (
                                <Badge variant={"secondary"}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-6 right-6 left-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <Avatar className="mr-2">
                                <AvatarImage src={room.User.profileImage as string} />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium leading-4">{room.User.firstName} {room.User.lastName}</div>
                                <div className="text-muted-foreground text-sm">Host</div>
                            </div>
                        </div>
                        <Button asChild>
                            <Link href={`/devrooms/browse/${room.id}`} className="flex gap-2 items-center">
                                <p>Join</p>
                                <ArrowRightIcon />
                            </Link>
                        </Button>
                    </div>
                </div>

            </CardContent> */}
        </Card>
    )
}