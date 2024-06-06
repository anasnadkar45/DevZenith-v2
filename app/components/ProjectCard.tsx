import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function ProjectCard() {
    return (
        <Card className="bg-card ">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/05.png" alt="Avatar" />
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                            Sofia Davis
                        </p>
                        <p className="text-sm text-muted-foreground">
                            sofia.davis@email.com
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Image src={'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230202143636/NEXT-js-tutorial-1.png'} alt="" width={500} height={500} />
                <p>Welcome to PHP Dev, a dedicated space for sharing knowledge about PHP and its ecosystem (only PHP directly related). Help us find good articles and blogposts and provide links. Upvote or downvote, after reading, it's essential</p>
            </CardContent>
            <CardFooter >
                <div className="gap-2 flex w-full justify-between">
                    <Button className="bg-primary/50 w-full" variant={"outline"} >
                        <div className="flex justify-center items-center gap-3">
                            <ArrowUpCircle />
                        </div>
                    </Button>
                    <Button className="bg-primary/50 w-full" variant={"outline"} >
                        <div className="flex justify-center items-center gap-3">
                            <ArrowUpCircle />
                        </div>
                    </Button>
                    <Button className="bg-primary/50 w-full" variant={"outline"} >
                        <div className="flex justify-center items-center gap-3">
                            <ArrowUpCircle />
                        </div>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}