'use client'

import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";


export default function SubmitButton({ label, className, icon, sr, disabled, variant } : {
    label: string;
    className?: string;
    icon?: any;
    sr?: boolean;
    disabled?: boolean;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" ;
}) {
    const { pending } = useFormStatus()

    return (
        <>
            <Button type="submit" variant={variant ? variant : 'default'} className={`flex flex-row items-center gap-2 ${className}`} disabled={pending || disabled}>
                {pending ? (
                    <>
                        <Loader className="size-4 animate-spin" />
                        <span className={sr ? 'sr-only' : ''}> { label } </span>
                    </>
                ) : (
                    <>
                        { icon }
                        <span className={sr ? 'sr-only' : ''}> { label } </span>
                    </>
                )}
            </Button>  
        </>
    )
}