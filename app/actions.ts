"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { Role, type CategoryTypes } from "@prisma/client";
import { redirect } from "next/navigation";
import { title } from "process";

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};

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
    return state;
}


// create Squad
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

