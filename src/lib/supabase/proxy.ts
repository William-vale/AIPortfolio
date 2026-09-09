import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        return supabaseResponse
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookieOptions: { secure: process.env.NODE_ENV === 'production' },
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value}) => 
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({ request})
                    cookiesToSet.forEach(({name, value, options}) => 
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        })

        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { pathname } = request.nextUrl
        const emAreaPrivada = pathname.startsWith('/painel')
        const emRotaDeAuth = pathname === '/entrar' || pathname === '/criar-conta'

        if (emAreaPrivada && !user) {
            return NextResponse.redirect(new URL('/entrar', request.url))
        }
        if (emRotaDeAuth && user) {
            return NextResponse.redirect(new URL('/painel', request.url))
        }

        return supabaseResponse
}

}
