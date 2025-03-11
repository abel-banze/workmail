"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SiHostinger, SiNamecheap, SiGodaddy, SiDigitalocean } from "react-icons/si"
import { FaServer, FaCloud, FaGlobe } from "react-icons/fa"
import SubmitButton from "@/components/forms/submit-button"
import { createConfig } from "@/actions/mail/config"
import { toast } from "sonner"

// Definição do tipo para configuração do provedor
type ProviderConfig = {
  name: string;
  imapHost: string;
  imapPort: number;
  smtpHost: string;
  smtpPort: number;
}

// Definições dos provedores de email
const providerConfigs: Record<string, ProviderConfig> = {
  hostinger: {
    name: "Hostinger",
    imapHost: "imap.hostinger.com",
    imapPort: 993,
    smtpHost: "smtp.hostinger.com",
    smtpPort: 465
  },
  mozdomains: {
    name: "MozDomains",
    imapHost: "mail.seudominio.com",
    imapPort: 993,
    smtpHost: "mail.seudominio.com",
    smtpPort: 465
  },
  turbohost: {
    name: "TurboHost",
    imapHost: "mail.turbohost.co.mz",
    imapPort: 993,
    smtpHost: "mail.turbohost.co.mz",
    smtpPort: 465
  },
  digitalocean: {
    name: "DigitalOcean",
    imapHost: "mail.digitalocean.com",
    imapPort: 993,
    smtpHost: "mail.digitalocean.com",
    smtpPort: 587
  },
  godaddy: {
    name: "GoDaddy",
    imapHost: "imap.secureserver.net",
    imapPort: 993,
    smtpHost: "smtpout.secureserver.net",
    smtpPort: 465
  },
  namecheap: {
    name: "Namecheap",
    imapHost: "mail.privateemail.com",
    imapPort: 993,
    smtpHost: "mail.privateemail.com",
    smtpPort: 465
  }
}

export default function RegisterForm() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  const handleSubmit = async (form: FormData) => {
    const email = form.get("email") as string
    const password = form.get("password") as string
    const provider = form.get("provider") as string

    if (!email || !password || !provider) {
      return
    }

    const data = {
      host: providerConfigs[provider].imapHost,
      port: providerConfigs[provider].imapPort,
      secure: true,
      auth: {
        user: email,
        pass: password
      }
    }

    const promise = await createConfig(data);

    if(promise.status === 200){
      toast.success("Auth success..")
    }else{
      toast.error(promise.message)
    }

  }

  return (
    <>
      <form action={handleSubmit} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
            <p className="text-balance text-muted-foreground">Entre na sua conta de e-mail</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          
          {/* Seção de seleção de provedor */}
          <div>
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">Selecione seu provedor de email</p>
            </div>
            <RadioGroup 
              value={selectedProvider || ""} 
              onValueChange={setSelectedProvider} 
              name="provider"
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <ProviderOption value="hostinger" name="Hostinger" icon={<SiHostinger size={24} />} />
              <ProviderOption value="mozdomains" name="MozDomains" icon={<FaGlobe size={24} />} />
              <ProviderOption value="turbohost" name="TurboHost" icon={<FaServer size={24} />} />
              <ProviderOption value="digitalocean" name="DigitalOcean" icon={<SiDigitalocean size={24} />} />
              <ProviderOption value="godaddy" name="GoDaddy" icon={<SiGodaddy size={24} />} />
              <ProviderOption value="namecheap" name="Namecheap" icon={<SiNamecheap size={24} />} />
            </RadioGroup>
          </div>


          <SubmitButton label="Login" disabled={!selectedProvider} />

          <div className="text-center text-sm">
            Configuração avançada?{" "}
            <a href="#" className="underline underline-offset-4">
              Configurar
            </a>
          </div>
        </div>
      </form>
    </>
  )
}

interface ProviderOptionProps {
  value: string
  name: string
  icon: React.ReactNode
}

function ProviderOption({ value, name, icon }: ProviderOptionProps) {
  // Define cores baseadas no nome do provedor
  const getColorFromName = (name: string) => {
    const colors = [
      "bg-blue-100 text-blue-600 border-blue-200 data-[state=checked]:border-blue-600",
      "bg-green-100 text-green-600 border-green-200 data-[state=checked]:border-green-600",
      "bg-purple-100 text-purple-600 border-purple-200 data-[state=checked]:border-purple-600",
      "bg-amber-100 text-amber-600 border-amber-200 data-[state=checked]:border-amber-600",
      "bg-rose-100 text-rose-600 border-rose-200 data-[state=checked]:border-rose-600",
      "bg-cyan-100 text-cyan-600 border-cyan-200 data-[state=checked]:border-cyan-600",
    ]

    const sum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[sum % colors.length]
  }

  const colorClass = getColorFromName(name)
  
  return (
    <div className="relative">
      <RadioGroupItem 
        value={value} 
        id={value} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer peer"
      />
      <Label 
        htmlFor={value}
        className={`flex items-center justify-center p-3 rounded-lg ${colorClass} 
          transition-all border-2 cursor-pointer
          peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2
          peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-offset-1
          peer-hover:scale-105`}
      >
        <div className="flex flex-col items-center gap-2">
          {icon}
          <div className="font-medium text-xs">{name}</div>
        </div>
      </Label>
    </div>
  )
}
