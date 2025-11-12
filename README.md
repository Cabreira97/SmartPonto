# SmartPonto

Sistema de controle de ponto inteligente para gestão de funcionários, escalas, folgas e produtividade.

## 📋 Sobre o Projeto

SmartPonto é uma aplicação web moderna desenvolvida com Next.js que permite gerenciar:

- ✅ Registro de ponto de funcionários
- 📅 Escalas de trabalho e turnos
- 🏖️ Solicitações de folgas e férias
- 📊 Relatórios de produtividade e horas trabalhadas
- 👥 Gestão de usuários, cargos e setores
- ⏰ Banco de horas e horas extras
- 📈 Dashboards e métricas de desempenho

## 🚀 Tecnologias

- **Next.js 14** - Framework React com renderização do lado do servidor
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Recharts** - Biblioteca para gráficos e visualizações

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Cabreira97/SmartPonto.git
cd SmartPonto

# Instale as dependências usando pnpm
pnpm install

# Execute em modo de desenvolvimento
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🛠️ Scripts Disponíveis

```bash
pnpm dev      # Inicia o servidor de desenvolvimento
pnpm build    # Cria build de produção
pnpm start    # Inicia servidor de produção
pnpm lint     # Executa o linter (ESLint)
```

## 🔄 CI/CD e Deploy

### O que é Cloud Agent?

**Cloud Agent** (ou **GitHub Actions Runner**) é um ambiente de execução virtual na nuvem que executa automaticamente os jobs definidos nos workflows do GitHub Actions. 

Quando você faz push de código ou cria um pull request, o GitHub aloca automaticamente um cloud agent (máquina virtual) que:

1. 🖥️ **Provisiona um ambiente limpo** - Cria uma máquina virtual Ubuntu, Windows ou macOS
2. 📥 **Faz checkout do código** - Baixa o código do repositório
3. ⚙️ **Executa os steps definidos** - Instala dependências, roda testes, faz build
4. 🚀 **Faz deploy** - Envia a aplicação para produção (se configurado)
5. 🧹 **Limpa o ambiente** - Remove a máquina virtual após conclusão

### Workflows do SmartPonto

Este projeto possui dois workflows:

#### 1. CI (Continuous Integration) - `.github/workflows/ci.yml`

Executa em **cloud agents do GitHub** sempre que há:
- Push para a branch `main`
- Pull request para `main`

**O que o cloud agent faz:**
```
✓ Instala Node.js 20 e pnpm
✓ Instala dependências do projeto
✓ Verifica tipos TypeScript (tsc --noEmit)
✓ Executa linter (eslint)
✓ Cria build de produção (next build)
✓ Faz upload dos artefatos de build
```

#### 2. CD (Continuous Deployment) - `.github/workflows/cd.yml`

Executa em **cloud agents do GitHub** sempre que há:
- Push para a branch `main`

**O que o cloud agent faz:**
```
✓ Instala Node.js 20 e pnpm
✓ Instala dependências do projeto
✓ Faz deploy para Vercel usando CLI
```

### Configuração de Secrets

Para o deploy funcionar, adicione o secret no repositório:

1. Vá em **Settings → Secrets and variables → Actions**
2. Crie um novo secret: `VERCEL_TOKEN`
3. Obtenha o token em: https://vercel.com/account/tokens

### Deploy Manual

Para fazer deploy manualmente sem usar o cloud agent:

```bash
VERCEL_TOKEN=seu_token npx vercel --prod --confirm
```

## 🏗️ Estrutura do Projeto

```
SmartPonto/
├── app/                    # Páginas e rotas (Next.js App Router)
│   ├── (auth)/            # Rotas de autenticação
│   ├── cargos/            # Gestão de cargos
│   ├── escalas/           # Gestão de escalas
│   ├── usuarios/          # Gestão de usuários
│   └── ...
├── components/            # Componentes React reutilizáveis
│   ├── ui/               # Componentes base de UI
│   ├── dashboard/        # Componentes do dashboard
│   └── ...
├── hooks/                # React hooks customizados
├── lib/                  # Utilitários e helpers
├── public/               # Arquivos estáticos
├── styles/               # Estilos globais
└── .github/workflows/    # Workflows de CI/CD
```

## 🔒 Segurança

- Nunca commite secrets ou tokens no código
- Use variáveis de ambiente para configurações sensíveis
- Os cloud agents do GitHub Actions têm acesso aos secrets através de `${{ secrets.NOME }}`

## 📝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
2. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
3. Push para a branch (`git push origin feature/nova-funcionalidade`)
4. Abra um Pull Request

O **cloud agent** automaticamente executará os testes e verificações do CI quando você abrir o PR!

## 📄 Licença

Este projeto é privado e de uso interno.

## 🤝 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Nota sobre Cloud Agents:** Os cloud agents (GitHub Actions runners) são gratuitos para repositórios públicos e têm limites mensais para repositórios privados. Consulte a [documentação do GitHub Actions](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) para mais informações.
