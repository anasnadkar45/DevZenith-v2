"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { RequestStatus, Role, TaskStatus, TypeOfVote, type CategoryTypes } from "@prisma/client";
import { redirect } from "next/navigation";
import { title } from "process";
import { revalidatePath } from "next/cache";
import { isValid, parseISO } from "date-fns";
import { StreamChat } from "stream-chat";

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};


async function getUserRole(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            role: true,
        }
    });

    return user?.role;
}


export async function generateTokenAction() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("No session found");
    }

    const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
    const api_secret = process.env.GET_STREAM_SECRET_KEY!;
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const token = serverClient.createToken(user.id);
    console.log("token", token);
    return token;
}

// Resources
const resourceSchema = z.object({
    name: z
        .string()
        .min(3, { message: "The name has to be a minimum character length of 3" }),
    description: z
        .string()
        .min(10, { message: "Description is required" }),
    category: z
        .string()
        .min(1, { message: "Category is required" }),
    url: z
        .string()
        .min(1, { message: "URL is required" }),
    image: z
        .string()
        .min(1, { message: "URL is required" }),
});

export async function AddResource(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error('Something went wrong');
    }

    const role = await getUserRole(user.id);

    if (role !== Role.ADMIN) {
        const state: State = {
            status: "error",
            message: "You do not have the necessary permissions to create a resource.",
        };

        console.log(state);
        return state;
    }

    const validateFields = resourceSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        category: formData.get('category'),
        url: formData.get('url'),
        image: JSON.parse(formData.get("image") as string),
    });

    if (!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        };

        console.log(state);
        return state;
    }

    const data = await prisma.resource.create({
        data: {
            name: validateFields.data.name,
            category: validateFields.data.category as CategoryTypes,
            userId: user.id,
            description: validateFields.data.description,
            url: validateFields.data.url,
            image: validateFields.data.image,
        },
    });

    const state: State = {
        status: "success",
        message: "Your resource has been created successfully",
    };

    console.log(state);
    redirect('/resources/all')

    return state;
}


// create Squad
const squadSchema = z.object({
    name: z
        .string()
        .min(3, { message: "The name has to be a minimum character length of 3" }),
    username: z
        .string()
        .min(5, { message: "The username has to be a minimum character length of 5" }),
    description: z
        .string()
        .min(10, { message: "Description has to be a minimum character length of 3" }),
    image: z
        .string()
        .min(1, { message: "image is required" }),
})

export async function createSquad(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/api/auth/login');
    }

    const validateFields = squadSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        username: formData.get('username'),
        image: JSON.parse(formData.get("image") as string),
    })

    if (!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        }
        return state;
    }

    // Check if the username already exists
    const existingSquad = await prisma.squad.findUnique({
        where: { username: validateFields.data.username },
    });

    if (existingSquad) {
        const state: State = {
            status: "error",
            message: "Username is already taken, please choose another one.",
        };
        return state;
    }

    const data = await prisma.squad.create({
        data: {
            name: validateFields.data.name,
            userId: user.id,
            description: validateFields.data.description,
            username: validateFields.data.username,
            image: validateFields.data.image
        }
    })

    const state: State = {
        status: "success",
        message: "Your Squad has been created successfully",
    };

    console.log(state);
    redirect('/squads')
    return state;
}

// Squadpost
const squadPostSchema = z.object({
    title: z
        .string()
        .min(3, { message: "The title has to be a minimum character length of 3" }),
    thumbnail: z
        .string()
        .min(1, { message: "image is required" }),
    description: z
        .any()
        .refine((value) => typeof value === "object" && value !== null, { message: "Description must be a valid JSON object" }),
    squadUsername: z
        .string()
        .min(1, { message: "Squad username is required" }),
});

export async function createSquadPost(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        const state: State = {
            status: "error",
            message: "User not found. Please log in to create a post.",
        };
        return state;
    }

    const description = formData.get('description');
    let parsedDescription;
    try {
        parsedDescription = JSON.parse(description as string);
    } catch (error) {
        const state: State = {
            status: "error",
            message: "Description must be valid JSON.",
        };
        return state;
    }

    // Validate fields
    const validateFields = squadPostSchema.safeParse({
        title: formData.get('title'),
        thumbnail: JSON.parse(formData.get("thumbnail") as string),
        description: parsedDescription,
        squadUsername: formData.get('squadUsername'),
    });

    if (!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        };
        return state;
    }

    try {
        // Create Squad Post
        const data = await prisma.squadPost.create({
            data: {
                title: validateFields.data.title,
                thumbnail: validateFields.data.thumbnail,
                description: validateFields.data.description,
                squadUsername: validateFields.data.squadUsername,
                userId: user.id,
            }
        });

        const state: State = {
            status: "success",
            message: "Your SquadPost has been created successfully",
        };
        return state;
    } catch (error) {
        console.error("Error creating SquadPost:", error);
        const state: State = {
            status: "error",
            message: "An error occurred while creating the SquadPost. Please try again later.",
        };
        return state;
    }
}

// handlevotes
export async function handleVote(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/api/auth/login');
    }

    const squadPostId = formData.get("squadPostId") as string;
    const voteDirection = formData.get("voteDirection") as TypeOfVote;

    const vote = await prisma.vote.findFirst({
        where: {
            squadPostId: squadPostId,
            userId: user.id,
        }
    });

    if (vote) {
        if (vote.voteType === voteDirection) {
            await prisma.vote.delete({
                where: {
                    id: vote.id
                }
            });

            return revalidatePath('/', "page");
        } else {
            await prisma.vote.update({
                where: {
                    id: vote.id
                },
                data: {
                    voteType: voteDirection,
                }
            });

            return revalidatePath('/', "page");
        }
    }

    await prisma.vote.create({
        data: {
            voteType: voteDirection,
            userId: user.id,
            squadPostId: squadPostId,
        }
    });

    return revalidatePath('/', "page");
}

// handel comments
export async function createComment(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/api/auth/login');
    }

    const comment = formData.get("comment") as string;
    const squadPostId = formData.get("squadPostId") as string;

    const data = await prisma.comment.create({
        data: {
            text: comment,
            userId: user.id,
            squadPostId: squadPostId,
        }
    })

    revalidatePath(`/squadpost/${squadPostId}`);

    const state: State = {
        status: "success",
        message: "Your Comment has been created successfully",
    };
    return state;
}

// Projects 
const projectSchema = z.object({
    name: z
        .string()
        .min(3, { message: "The title has to be a minimum character length of 3" }),
    url: z
        .string()
        .min(1, { message: "URL is required" }),
    logo: z
        .string()
        .min(1, { message: "URL is required" }),
    description: z
        .string()
        .min(3, { message: "The title has to be a minimum character length of 3" }),
    tags: z.array(z.string()).optional(),
})

export async function createProject(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to create a project.",
        };
    }

    const validateFields = projectSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        url: formData.get('url'),
        logo: JSON.parse(formData.get("logo") as string),
        tags: JSON.parse(formData.get('tags') as string)
    });

    if (!validateFields.success) {
        return {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        };
    }

    try {
        const data = await prisma.project.create({
            data: {
                name: validateFields.data.name,
                description: validateFields.data.description,
                url: validateFields.data.url,
                logo: validateFields.data.logo,
                tags: validateFields.data.tags ?? [],
                userId: user.id,
            },
        });

        revalidatePath('/projects');

        if (data) {
            return {
                status: "success",
                message: "Your Project has been created successfully",
            };
        }

        const state: State = {
            status: "success",
            message: "Your Request has been created successfully",
        };
        return state;

    } catch (error) {
        console.error("Error creating project:", error);
        return {
            status: "error",
            message: "An error occurred while creating the project. Please try again later.",
        };
    }
}

// Task
const taskSchema = z.object({
    title: z
        .string()
        .min(3, { message: "The title has to be a minimum character length of 3" }),
    description: z
        .string()
        .min(1, { message: "Description is required" }),
    userId: z
        .string()
        .optional(),
    priority: z
        .string()
        .min(1, { message: "Priority is required" }),
    type: z
        .string()
        .min(1, { message: "Yype is required" }),
    date: z
        .string()
        .refine((date) => {
            const parsedDate = parseISO(date);
            return isValid(parsedDate);
        }, { message: "Invalid date" })
        .optional(),
    projectId: z
        .string()
        .min(1, { message: "Project ID is required" }),
});

export async function assignTask(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to assign a task.",
        };
    }

    const validateFields = taskSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        priority: formData.get('priority'),
        type: formData.get('type'),
        date: formData.get('date'),
        userId: formData.get('userId'),
        projectId: formData.get('projectId'),
    });

    if (!validateFields.success) {
        return {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        };
    }

    const projectId = validateFields.data.projectId;
    const assigneeId = validateFields.data.userId;
    const date = validateFields.data.date;

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            userId: true,
        }
    });

    if (!project) {
        return {
            status: "error",
            message: "Project not found.",
        };
    }

    if (user.id !== project.userId) {
        return {
            status: "error",
            message: "Only the project creator can assign tasks.",
        };
    }

    const isMember = await prisma.projectMembership.findFirst({
        where: {
            userId: assigneeId,
            projectId: projectId,
        }
    });

    if (!isMember) {
        return {
            status: "error",
            message: "Assignee is not a member of this project.",
        };
    }

    try {
        const data = await prisma.task.create({
            data: {
                title: validateFields.data.title,
                description: validateFields.data.description,
                priority: validateFields.data.priority,
                type: validateFields.data.type,
                date: date ? new Date(date) : null,
                userId: assigneeId ?? null,
                projectId: projectId,
            }
        });

        revalidatePath(`/project/${projectId}/tasks`);

        if (data) {
            return {
                status: "success",
                message: "Task has been assigned successfully",
            };
        }
        const state: State = {
            status: "success",
            message: "Task has been assigned successfully",
        };
        return state;
    } catch (error) {
        console.error("Error assigning task:", error);
        return {
            status: "error",
            message: "An error occurred while assigning the task. Please try again later.",
        };
    }
}


export async function updateTaskStatus(prevState: any, formData: FormData) {
    const taskId = formData.get('taskId') as string;
    const newStatus = formData.get('status') as TaskStatus;
    const projectId = formData.get('projectId') as string;

    if (!taskId || !newStatus) {
        return {
            status: "error",
            message: "Task ID or status is missing.",
        };
    }

    try {
        const data = await prisma.task.update({
            where: { id: taskId },
            data: { status: newStatus },
        });

        revalidatePath(`/project/joined/${projectId}/tasks`);
        if (data) {
            return {
                status: "success",
                message: "Task status updated successfully.",
            };
        }

        const state: State = {
            status: "success",
            message: "Task status updated successfully.",
        };
        return state;

    } catch (error) {
        console.error("Error updating task status:", error);
        return {
            status: "error",
            message: "An error occurred while updating the task status. Please try again later.",
        };
    }
}

// Membership request
export async function createMembershipRequest(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to create a membership request.",
        };
    }

    const projectId = formData.get("projectId") as string;

    try {
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            },
            select: {
                userId: true
            }
        })

        if (project?.userId === user.id) {
            return {
                status: "error",
                message: "You cannot request to join a project you created.",
            };
        }

        const existingMembership = await prisma.membershipRequest.findFirst({
            where: {
                userId: user.id,
                projectId: projectId,
                status: "ACCEPTED"
            }
        })

        if (existingMembership) {
            return {
                status: "error",
                message: "You are already a member of this project.",
            };
        }

        const existingRequest = await prisma.membershipRequest.findFirst({
            where: {
                userId: user.id,
                projectId: projectId,
                status: 'PENDING',
            }
        });

        if (existingRequest) {
            return {
                status: "error",
                message: "You already have a pending membership request for this project.",
            };
        }

        const data = await prisma.membershipRequest.create({
            data: {
                projectId: projectId,
                userId: user.id,
                status: "PENDING",
            }
        });

        if (data) {
            return {
                status: "success",
                message: "Membership request has been created successfully",
            };
        }

        const state: State = {
            status: "success",
            message: "Membership request has been created successfully",
        };
        return state;

    } catch (error) {
        console.error("Error creating membership request:", error);
        return {
            status: "error",
            message: "An error occurred while creating the membership request. Please try again later.",
        };
    }
}

export async function updateMembershipRequest(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to update the membership request.",
        };
    }

    const membershipRequestId = formData.get('membershipRequestId') as string;
    const status = formData.get('status') as RequestStatus;

    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
        return {
            status: "error",
            message: "Invalid status value.",
        };
    }

    try {
        const updatedRequest = await prisma.membershipRequest.update({
            where: {
                id: membershipRequestId
            },
            data: {
                status
            },
            select: {
                projectId: true,
                userId: true
            }
        });

        if (status === "ACCEPTED") {
            await createProjectMembership(updatedRequest.projectId as string, updatedRequest.userId as string);
        }

        if (status === "REJECTED") {
            const updatedResponse = await prisma.projectMembership.deleteMany({
                where: {
                    userId: updatedRequest.userId,
                    projectId: updatedRequest.projectId,
                }
            });
        }
        revalidatePath(`/project/${updatedRequest.projectId}/requests`);

        if (updatedRequest) {
            return {
                status: "success",
                message: "Membership request updated successfully.",
            };
        }
        const state: State = {
            status: "success",
            message: "Your Project Resource has been added successfully",
        };
        return state;

    } catch (error) {
        console.error("Error updating membership request:", error);
        return {
            status: "error",
            message: "An error occurred while updating the membership request. Please try again later.",
        };
    }
}

export async function createProjectMembership(projectId: string, userId: string) {
    try {
        const existingMembership = await prisma.projectMembership.findFirst({
            where: {
                userId,
                projectId
            }
        });

        if (existingMembership) {
            return {
                status: "error",
                message: "User is already a member of this project.",
            };
        }

        const membership = await prisma.projectMembership.create({
            data: {
                userId,
                projectId,
            },
        });

        return {
            status: "success",
            message: "Project membership created successfully.",
            membership,
        };
    } catch (error) {
        console.error("Error creating project membership:", error);
        return {
            status: "error",
            message: "An error occurred while creating project membership. Please try again later.",
        };
    }
}

// Project Resource
const projectResourceSchema = z.object({
    name: z
        .string()
        .min(3, { message: "The title has to be a minimum character length of 3" }),
    category: z
        .string()
        .min(3, { message: "The title has to be a minimum character length of 3" }),
    link: z.string().optional(),
    file: z.string().optional(),
})

export async function AddProjectResource(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to create a project.",
        };
    }

    const validateFields = projectResourceSchema.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
        link: formData.get('link'),
        file: formData.get("file") ? JSON.parse(formData.get("file") as string) : "",
    });

    // Validate the fields
    if (!validateFields.success) {
        return {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        };
    }

    // Check if file is provided
    const fileUrl = validateFields.data.file;

    const projectId = formData.get('projectId') as string;
    try {
        const data = await prisma.projectResource.create({
            data: {
                name: validateFields.data.name,
                category: validateFields.data.category,
                link: validateFields.data.link,
                file: fileUrl,
                projectId: projectId,
                userId: user?.id ?? null,
            },
        });

        revalidatePath(`/project/myproject/${projectId}/resources`);

        if (data) {
            return {
                status: "success",
                message: "Your Project Resource has been added successfully",
            };
        }

        const state: State = {
            status: "success",
            message: "Your Project Resource has been added successfully",
        };
        return state;

    } catch (error) {
        console.error("Error adding Project Resource:", error);
        return {
            status: "error",
            message: "An error occurred while adding the project resource. Please try again later.",
        };
    }
}

const DevRoomSchema = z.object({
    name: z
        .string()
        .min(3, { message: "The title has to be a minimum character length of 3" }),
    url: z
        .string()
        .min(1, { message: "URL is required" }),
    description: z
        .string()
        .min(3, { message: "The description has to be a minimum character length of 3" }),
    tags: z.array(z.string()).optional(),
});

export async function createDevRoom(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to create a DevRoom.",
        };
    }

    const validateFields = DevRoomSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        url: formData.get('url'),
        tags: JSON.parse(formData.get('tags') as string)
    });

    if (!validateFields.success) {
        return {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        };
    }

    try {
        const data = await prisma.room.create({
            data: {
                name: validateFields.data.name,
                description: validateFields.data.description,
                url: validateFields.data.url,
                tags: validateFields.data.tags ?? [],
                userId: user.id,
            },
        });

        revalidatePath('/devrooms/browse');

        if (data) {
            return {
                status: "success",
                message: "Your DevRoom has been created successfully",
            };
        }

        const state: State = {
            status: "success",
            message: "Your DevRoom has been created successfully",
        };
        return state;

    } catch (error) {
        console.error("Error creating DevRoom:", error);
        return {
            status: "error",
            message: "An error occurred while creating the DevRoom. Please try again later.",
        };
    }
}

export async function deleteDevRoom(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to create a DevRoom.",
        };
    }

    const roomId = formData.get('roomId') as string;
    try{
        const data = await prisma.room.delete({
            where:{
                id:roomId
            }
        })

        revalidatePath('/devrooms/ypur-rooms');
        if (data) {
            return {
                status: "success",
                message: "Your DevRoom has been deleted successfully",
            };
        }
        const state: State = {
            status: "success",
            message: "Your DevRoom has been deleted successfully",
        };
        return state;

    }catch(err) {
        return {
            status: "error",
            message: "An error occurred while deleting the DevRoom. Please try again later.",
        };
    }
}