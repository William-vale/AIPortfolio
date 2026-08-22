"use client"

import { useEffect } from "react"

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("[v0] Erro inerperado na aplicação:", error)
    }, [error])

    return (
        <main className="error-page" role="alert">
            <div className="error-card">
                <p className="eyebrow">AI Portfolio</p>
                <h1>Algo inesperado aconteceu.</h1>
                <p>
                    Não foi possível carregar esta página agora. Tente novamente ou volte
                    para o início.
                </p>
                <div className="error-actions">
                    <button className="button button-primary" type="button" onClick={() => reset()}>
                        Tentar novamente
                    </button>
                    <a className="button button-secondary" href={'/'}>
                        Voltar ao início
                    </a>
                </div>
            </div>
        </main>
    );
}