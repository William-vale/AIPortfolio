import Link from "next/link"

export default function NotFound() {
    return (
        <main className="error-page" aria-labelledby="not-found-title">
            <section className="error-card">
                <p className="eyebrow">AI Portfolio</p>
                <h1 id="not-found-title">Página não encontrada</h1>
                <p>O endereço que você acessou não existe ou foi movido.</p>
                <div className="error-actions">
                    <Link className="button button-primary" href={'/'}>
                        Voltar para o início
                    </Link>
                </div>
            </section>
        </main>
    )
}