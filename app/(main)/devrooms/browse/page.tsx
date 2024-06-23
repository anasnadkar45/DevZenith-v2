import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, GithubIcon, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateRoom from "@/app/components/dev-rooms/CreateRoom";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import Link from "next/link";

export async function getRoomData() {
    const data = await prisma.room.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            url: true,
            tags: true,
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                }
            }
        }
    })
    return data;
}

export default async function BrowsePage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser()
    const RoomData = await getRoomData()
    return (
        <div>
            <div className="w-full flex justify-between my-2">
                <h1 className="text-2xl font-bold "><span className="text-primary">Browse</span> DevRooms</h1>
                <CreateRoom />
            </div>
            <div className="flex items-center max-w-md mx-auto">
                <Input type="text" placeholder="Search for a room..." className="flex-1 mr-2" />
                <Button variant="outline" size="icon">
                    <SearchIcon className="w-5 h-5" />
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {RoomData.map((room) => (
                    <Card key={room.id}>
                        <CardHeader>
                            <CardTitle className="font-bold">{room.name}</CardTitle>
                            <CardDescription className="line-clamp-3">
                                {room.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
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
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Avatar className="mr-2">
                                            <AvatarImage src={room.User.profileImage} />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium leading-4">{room.User.firstName} {room.User.lastName}</div>
                                            <div className="text-muted-foreground text-sm">Host</div>
                                        </div>
                                    </div>
                                    <Button className="flex gap-2 items-center">
                                        <p>Join</p>
                                        <ArrowRightIcon />
                                    </Button>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                ))}

            </div>
        </div>
    )
}