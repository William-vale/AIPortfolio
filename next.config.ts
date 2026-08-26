/* import type { NextConfig } from "next";

const nextConfig: NextConfig = {/* config options here };

export default nextConfig; */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Força a geração de HTML/CSS/JS estáticos
  images: {
    unoptimized: true, // Desativa a otimização de imagem que exige servidor
  },
  // ATENÇÃO: Descomente as linhas abaixo APENAS se você NÃO estiver usando um domínio personalizado.
  // basePath: '/nome-do-seu-repositorio',
  // assetPrefix: '/nome-do-seu-repositorio/',
};

export default nextConfig;
