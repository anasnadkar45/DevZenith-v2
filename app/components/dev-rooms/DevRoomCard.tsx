import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { ArrowRightIcon, GithubIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface iAppProps {
    id: string;
    name: string;
    tags: [string];
    url: string;
    description: string;
    firstName: string;
    lastName: string;
    profileImage: string;
}

export function DevRoomCard({
    id,
    name,
    tags,
    url,
    description,
    firstName,
    lastName,
    profileImage,
}: iAppProps) {
    return (
        <Card key={id} className="min-h-[300px] relative">
            <CardHeader>
                <CardTitle className="font-bold">{name}</CardTitle>
                <CardDescription className="line-clamp-3">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="space-y-2">
                        <Link href={url as string} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                            <GithubIcon className="w-5 h-5" />
                            <p>Github Url</p>
                        </Link>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge variant={"secondary"}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-6 right-6 left-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <Avatar className="mr-2">
                                <AvatarImage src={profileImage} />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium leading-4">{firstName} {lastName}</div>
                                <div className="text-muted-foreground text-sm">Host</div>
                            </div>
                        </div>
                        <Button asChild>
                            <Link href={`/devrooms/browse/${id}`} className="flex gap-2 items-center">
                                <p>Join</p>
                                <ArrowRightIcon />
                            </Link>
                        </Button>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}