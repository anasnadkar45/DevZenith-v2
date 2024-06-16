"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { RequestStatus, Role, TypeOfVote, type CategoryTypes } from "@prisma/client";
import { redirect } from "next/navigation";
import { title } from "process";
import { revalidatePath } from "next/cache";

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

        return {
            status: "success",
            message: "Your Project has been created successfully",
        };
    } catch (error) {
        console.error("Error creating project:", error);
        return {
            status: "error",
            message: "An error occurred while creating the project. Please try again later.",
        };
    }
}

export async function CreateMembershipRequest(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to create a project.",
        };
    }

    const projectId = formData.get('projectId') as string;

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

    if (user.id === project.userId) {
        return {
            status: "error",
            message: "Project creators cannot create membership requests for their own projects.",
        };
    }

    // checking if request already exists
    const existingRequest = await prisma.membershipRequest.findFirst({
        where: {
            userId: user.id,
            projectId: projectId,
        },
        select: {
            status: true,
        }
    })

    if (existingRequest) {
        return {
            status: "error",
            message: `You already have a ${existingRequest.status.toLowerCase()} request for this project.`,
            requestStatus: existingRequest.status,
        };
    }

    const data = await prisma.membershipRequest.create({
        data: {
            userId: user.id,
            projectId: projectId,
        }
    })

    if (data) {
        return {
            status: "success",
            message: "Your request has been created successfully.",
            requestStatus: "PENDING",
        };
    }

    const state: State = {
        status: "success",
        message: "Your Request has been created successfully",
    };
    return state;
}

export async function updateMembershipRequest(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to create a project.",
        };
    }

    // const projectId = formData.get('projectId') as string;
    const membershipRequestId = formData.get('membershipRequestId') as string;
    const status = formData.get('status') as string;

    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
        return {
            status: "error",
            message: "Invalid status value.",
        };
    }

    const updatedRequest = await prisma.membershipRequest.update({
        where: {
            id: membershipRequestId
        },
        data: {
            status : status as RequestStatus
        }
    });

    revalidatePath(`/project/myproject/${membershipRequestId}`);

    const state: State = {
        status: "success",
        message: "Your Request has been created successfully",
    };
    return state;
}