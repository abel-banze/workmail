'use server'

import { db } from "@/actions/config";
import { revalidatePath } from "next/cache";
import { getLoggedUser } from "./get";

export async function deleteUser(data: any){
    try{

        const user = await getLoggedUser()

        if(!user) return { status: 401, message: 'Não tem autorização.' }

        const promise = await db.user.delete({
            where: {
                id: data.id
            }
        });

        if(!promise) return { status: 404, message: 'Not Found', data: null }

        revalidatePath('/[lang]/admin/users', 'layout')

        return { status: 200, message: 'Success', data: promise }

    }catch(error){
        return { status: 500, message: 'Internal Server Error', data: error }
    }
}