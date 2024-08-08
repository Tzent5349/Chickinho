"use server"
import connectToDatabase from "@/lib/database/index";
import User from "@/lib/database/models/user.model";
import { createUserParams } from "@/types";


export const createUser = async ({ user }: createUserParams) => {
    try {
        await connectToDatabase();
        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser));

    } catch (error) {
        console.log(error);
    }
}

export const getAllUser = async () => {
    try {
        await connectToDatabase();
        const allUser = await User.find();
        return JSON.parse(JSON.stringify(allUser));
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (userId: string) => {
    try {
        await connectToDatabase();
        if (!userId) throw new Error("user not found");
        const user = await User.findById(userId);
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error(error);
    }
}