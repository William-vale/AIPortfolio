import { Analytics } from '@vercel/analytics/next'
import { Inter, Plus_Jakarta_Sans, Geist } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata: Metadata = {
  title: 'AI Portfolio - Apresentações profissionais com relevância',
  description: 'Mantenha seu perfil profissional em um só lugar e apresente o que é mais relevante para cada oportunidade',
  generator: 'AI Portfolio',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8fafc',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={cn("bg-background", "font-sans", geist.variable)}>
      <body className={`${inter.variable} ${plusJakarta.variable}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}