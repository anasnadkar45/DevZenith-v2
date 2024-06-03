"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { Role, type CategoryTypes } from "@prisma/client";

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
