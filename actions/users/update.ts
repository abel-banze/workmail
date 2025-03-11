'use server'

import { db } from "@/actions/config";
import { revalidatePath } from "next/cache";
import { getLoggedUser } from "./get";


export async function updateUser(data: any){
    try{

        const user = await getLoggedUser()

        if(!user){
            return { 
                status: 401, 
                message: {
                    title: 'Precisa de autenticação',
                    description: 'Faça login para continuar'
                }, 
                data: null
            }
        }

        const { id } = user;

        const updatedUser = await db.user.update({
            where: { id },
            data,
        });

        if(!updatedUser){
            return { 
                status: 404, 
                message: {
                    title: 'Usuário não encontrado',
                    description: 'Verifique se o usuário existe e tente novamente'
                }, 
                data: null
            }
        }

        revalidatePath("/[lang]/dashboard", 'layout')

        return { 
            status: 200, 
            message: {
                title: 'Usuário atualizado com sucesso',
                description: 'Suas informações foram atualizadas com sucesso'}, 
                data: updatedUser 
            }

    }catch(error){
        return { 
            status: 500, 
            message: {
                title: 'Erro ao atualizar usuário',
                description: 'Verifique se o usuário existe e tente novamente'
            }, 
            data: null
        }
    }
}
