import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { ArrowRightIcon, GithubIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface iRoomProps {
    id: string;
    name: string;
    description: string | null;
    tags: string[];
    url: string | null;
    User: {
      firstName: string;
      lastName: string;
      profileImage: string;
    };
  }
  

interface Prop {
    room: iRoomProps;
    index: number;
}

export function DevRoomCard({room}:Prop) {
    return (
        <Card key={room.id} className="min-h-[300px] relative">
            <CardHeader>
                <CardTitle className="font-bold">{room.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                    {room.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
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

            </CardContent>
        </Card>
    )
}