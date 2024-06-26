"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRightIcon, GithubIcon, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deleteDevRoom } from "@/app/actions";
import { toast } from "sonner";


interface iAppProps {
    id: string;
    projectId: string;
    name: string;
    tags: [string];
    url: string;
    description: string;
    firstName: string;
    lastName: string;
    profileImage: string;
}

export function ProjectMeetCard({
    id,
    projectId,
    name,
    tags,
    url,
    description,
    firstName,
    lastName,
    profileImage,
}: iAppProps) {
    // const handleDelete = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("roomId", id);

    //         const result = await deleteDevRoom({}, formData); // Pass empty prevState

    //         if (result.status === "success") {
    //             toast.success(result.message);
    //         } else {
    //             toast.error(result.message);
    //         }
    //     } catch (error) {
    //         console.error("Error deleting DevRoom:", error);
    //         toast.error("An error occurred while deleting the DevRoom. Please try again later.");
    //     }
    // };

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
                        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                            <GithubIcon className="w-5 h-5" />
                            <p>Github Url</p>
                        </a>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <Badge key={index} variant={"secondary"}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-6 right-6 left-6 flex items-center gap-2">
                        <Button asChild>
                            <a href={`/project/joined/${projectId}/meet/${id}`} className="flex gap-2 items-center w-full">
                                <p>Join</p>
                                <ArrowRightIcon />
                            </a>
                        </Button>
                        {/* <Button variant={"secondary"} onClick={handleDelete} className="flex gap-2 items-center w-full">
                            <p>Delete</p>
                            <Trash />
                        </Button> */}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
