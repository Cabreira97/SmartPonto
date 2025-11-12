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

## 🔄 CI/CD e Deploy Zero-Downtime

### O que é Zero-Downtime Deployment?

**Zero-Downtime Deployment** é uma estratégia de implantação onde a aplicação permanece **100% disponível** durante atualizações. O sistema:

1. 🏗️ **Constrói a nova versão** em paralelo
2. 🏥 **Verifica saúde** da nova versão (health checks)
3. 🔄 **Redireciona tráfego** gradualmente
4. ⏮️ **Faz rollback** automático se houver problemas
5. ✅ **Finaliza** apenas após sucesso confirmado

### Workflows Automatizados

#### 1. CI (Continuous Integration) - `.github/workflows/ci.yml`

Executa automaticamente em **PRs** e **push para main**:

```
✓ Verificação de tipos TypeScript
✓ Análise de código (ESLint)
✓ Build de produção
✓ Teste de health check
✓ Upload de artefatos
```

#### 2. CD (Continuous Deployment) - `.github/workflows/cd.yml`

Executa automaticamente em **push para main**:

```
✓ Build otimizado
✓ Deploy para Vercel com zero-downtime
✓ Health check com 5 retries
✓ Rollback automático em falhas
✓ Resumo de deployment
```

**Recursos de Zero-Downtime:**
- ✅ Vercel gerencia blue-green deployment automaticamente
- ✅ Health checks garantem estabilidade antes de promover
- ✅ Rollback instantâneo se algo falhar
- ✅ Versão anterior permanece ativa durante deploy
- ✅ Sem interrupção de serviço

### Endpoint de Saúde

Health check disponível em `/api/health`:

```bash
curl https://seu-app.vercel.app/api/health
```

Resposta:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-12T22:00:00.000Z",
  "version": "0.1.0",
  "uptime": 123.45
}
```

### Configuração de Secrets

Para habilitar deploy automático, configure em **Settings → Secrets → Actions**:

1. **`VERCEL_TOKEN`** (obrigatório) - Token da sua conta Vercel
   - Obtenha em: https://vercel.com/account/tokens

2. **`VERCEL_ORG_ID`** (opcional) - ID da organização
   - Melhora performance do deploy

3. **`VERCEL_PROJECT_ID`** (opcional) - ID do projeto
   - Garante deploy no projeto correto

### Deploy Manual

```bash
# Via Vercel CLI
npm install -g vercel
vercel --prod --token seu_token

# Via GitHub Actions
# Vá em Actions → CD → Run workflow
```

### Rollback

Se precisar reverter um deploy:

**Automático:** Health check falha → versão anterior mantida

**Manual via Vercel:**
```bash
vercel rollback
```

**Manual via Dashboard:**
Settings → Deployments → Promote previous deployment

📖 **Documentação completa:** Veja [DEPLOYMENT.md](./DEPLOYMENT.md)

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

- ✅ Nunca commite secrets ou tokens no código
- ✅ Use variáveis de ambiente para configurações sensíveis
- ✅ Health checks previnem deploys quebrados
- ✅ Rollback automático em caso de falhas
- ✅ GitHub Actions acessa secrets via `${{ secrets.NOME }}`
- ✅ Build isolado em ambientes limpos

## 📝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
2. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
3. Push para a branch (`git push origin feature/nova-funcionalidade`)
4. Abra um Pull Request

O **CI workflow** executará automaticamente:
- ✅ Verificação de tipos
- ✅ Análise de código (lint)
- ✅ Build de produção
- ✅ Testes de health check

Após merge para `main`, o **CD workflow** fará deploy automático com zero-downtime!

## 📄 Licença

Este projeto é privado e de uso interno.

## 🤝 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Nota:** Este projeto utiliza GitHub Actions (cloud agents gratuitos) para automação de CI/CD com deploy zero-downtime. Para mais detalhes, consulte [DEPLOYMENT.md](./DEPLOYMENT.md) e a [documentação do GitHub Actions](https://docs.github.com/en/actions).
