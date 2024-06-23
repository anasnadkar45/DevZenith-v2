import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, GithubIcon, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateRoom from "@/app/components/dev-rooms/CreateRoom";

export default function BrowsePage() {
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
                <Card>
                    <CardHeader>
                        <CardTitle>Room 1</CardTitle>
                        <CardDescription>
                            This is a description of Room 1. It can include details about the room, such as the number of
                            participants, the topic, or any other relevant information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <GithubIcon className="w-5 h-5" />
                                </a>
                                <Badge >JavaScript</Badge>
                                <Badge >React</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Avatar className="mr-2">
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">John Doe</div>
                                        <div className="text-muted-foreground text-sm">Host</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Room 2</CardTitle>
                        <CardDescription>
                            This is a description of Room 2. It can include details about the room, such as the number of
                            participants, the topic, or any other relevant information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Avatar className="mr-2">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">Jane Doe</div>
                                    <div className="text-muted-foreground text-sm">Host</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <ArrowRightIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Room 3</CardTitle>
                        <CardDescription>
                            This is a description of Room 3. It can include details about the room, such as the number of
                            participants, the topic, or any other relevant information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Avatar className="mr-2">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">John Smith</div>
                                    <div className="text-muted-foreground text-sm">Host</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <ArrowRightIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}