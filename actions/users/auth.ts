'use server'

import { DEFAULT_REDIRECT, locales } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { db } from "@/actions/config";
import { getUserBy } from "./get";


export async function createAccount(data: {
    email: string;
    firstName: string;
    lastName: string;
}){    
    try{
        const check = await db.user.findUnique({
            where : {
                email: data.email
            }
        });

        if(check) return null;

        const create = await db.user.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                name: data.email.split('@')[0],
            }
        });

        if(!create) return null;

        return create;


    }catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { msg: "Credenciais inválidas.", status: "error" };
                default:
                    return { msg: "Credenciais inválidas.", status: "error" };
            }
        }
        return null;
    }
}



export async function login({email, password, type, redirect: customRedirect, locale} : {
    email?: string;
    password?: string;
    type: string;
    redirect?: string | null;
    locale?: string;
}){
    try{
        const redirectTo = customRedirect || DEFAULT_REDIRECT;
        
        if(type === 'credentials'){
            await signIn('credentials', {
                email: email,
                password: password,
                redirectTo: redirectTo
            })
        }else{
            await signIn(type, {
                redirectTo: redirectTo
            })
        }

        return {msg: "Redirecting...", status: 'success'};
        
    }catch(error){
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { msg: "Credenciais inválidas." , status: "error"};
                default:
                    return { msg: "Credenciais inválidas.", status: "error" };
            }
        }
        throw error;
    }
}
