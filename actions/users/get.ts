'use server'

import { db } from "@/actions/config";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getLoggedUser(){
    try{

        const session = await auth();

        if(session && session.user && session.user.email){
            const promise = await db.user.findUnique({
                where: {
                    email: session.user.email
                },
                include: {
                    accounts: true
                }
            });

            if(!promise) return null;
        
            return promise;
        }

        return null;

    }catch(err){
        console.log(err);
        return null;
    }
}

export async function getUserBy({ args} : { args: {
    key: string;
    value: string;
} }){
    try{
        const promise = await db.user.findFirst({
            where: {
                [args.key]: args.value
            }
        });

        if(!promise) return { status: 404, message: 'Not Found', data: null }

        return { status: 200, message: 'Success', data: promise }
    }catch(err){
        return { status: 500, message: 'Internal Server Error', data: null }
    }
}

export async function getAllUsers({ 
    name,
    page = 1,
    limit = 9,
    minFollowers,
    maxFollowers 
}: {
    name?: string;
    page?: number | string;  
    limit?: number | string;
    minFollowers?: number;
    maxFollowers?: number;
}) {
    try {
        const validPage = Math.max(1, Number(page) || 1);
        const validLimit = Math.max(1, Number(limit) || 9);
        
        const skip = (validPage - 1) * validLimit;

        let whereClause: any = {};

        if (name) {
            whereClause.name = {
                contains: name,
                mode: 'insensitive'
            };
        }



        if (minFollowers !== undefined || maxFollowers !== undefined) {
            whereClause.followers = {
                _count: {
                    gte: Number(minFollowers) || undefined,
                    lte: Number(maxFollowers) || undefined
                }
            };
        }

        const total = await db.user.count({
            where: whereClause
        });

        const users = await db.user.findMany({
            where: whereClause,
            skip,
            take: validLimit,
        });

        const totalPages = Math.ceil(total / validLimit);

        // Calculate if there are previous and next pages
        const hasPreviousPage = validPage > 1;
        const hasNextPage = validPage < totalPages;

        return {
            users,
            pagination: {
                total,
                totalPages,
                currentPage: validPage,
                limit: validLimit,
                hasPreviousPage,
                hasNextPage
            }
        };

    } catch (err) {
        console.error("Error fetching users:", err);
        throw new Error("Failed to fetch users");
    }
}