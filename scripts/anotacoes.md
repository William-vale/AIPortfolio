Sempre que iniciar o codespace no github

# 1. Remova a pasta node_modules e o arquivo de lock
rm -rf node_modules package-lock.json

# 2. Limpe o cache do npm (opcional, mas recomendado)
npm cache clean --force

# 3. Instale todas as dependências novamente
npm install

# 4. Instalação do Tailwind
npm install @tailwindcss/oxide-linux-x64-gnu --save-dev
