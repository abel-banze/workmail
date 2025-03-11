'use server'


import { db } from "../config"
import { createAccount } from "../users/auth"
import { getUserBy } from "../users/get"


export async function createConfig(data: any){
    try{


        const user = await db.user.create({
            data: {
                email: data.auth.user,
                name: data.auth.user.split('@')[0],
            }
        })

        const promise = await db.emailConfig.create({
            data: {
                user: {
                    connect: {
                        id: user.id,
                    }
                },
                email: data.auth.user,
                host: data.host,
                port: data.port,
                password: data.auth.pass,
            }
        });

        return {
            status: 200,
            message: 'User created',
            data: user
        }

    }catch(err){
        return {
            status: 500,
            message: 'Something went wrong',
            data: null
        }
    }
}