# Guia Rápido: Deploy Zero-Downtime com GitHub Actions e Vercel

## 🚀 Configuração Inicial (Uma vez)

### 1. Configure os Secrets no GitHub

```bash
# Vá para: Settings → Secrets and variables → Actions → New repository secret
```

**Secrets obrigatórios:**

1. `VERCEL_TOKEN` - [Criar aqui](https://vercel.com/account/tokens)

**Secrets opcionais (recomendados):**

2. `VERCEL_ORG_ID` - Encontre em: Vercel Dashboard → Settings → General
3. `VERCEL_PROJECT_ID` - Encontre em: Project Settings → General

### 2. Verifique os Workflows

Os workflows já estão configurados em `.github/workflows/`:
- ✅ `ci.yml` - Executa testes e build
- ✅ `cd.yml` - Faz deploy com zero-downtime

## 📝 Fluxo de Trabalho Diário

### Desenvolvimento Local

```bash
# 1. Crie uma branch para sua feature
git checkout -b feature/minha-funcionalidade

# 2. Desenvolva e teste localmente
pnpm dev

# 3. Rode lint e build
pnpm lint
pnpm build

# 4. Commit suas mudanças
git add .
git commit -m "Adiciona minha funcionalidade"

# 5. Push para o GitHub
git push origin feature/minha-funcionalidade
```

### Criando Pull Request

```bash
# 1. Abra um Pull Request no GitHub
# O CI executará automaticamente:
#   ✓ TypeScript typecheck
#   ✓ ESLint
#   ✓ Build
#   ✓ Health check test

# 2. Aguarde aprovação e merge
```

### Deploy Automático

```bash
# Após merge para main:
git checkout main
git pull origin main

# O GitHub Actions automaticamente:
#  1. ✓ Executa CI (testes, lint, build)
#  2. ✓ Faz deploy para Vercel
#  3. ✓ Executa health check (5 retries)
#  4. ✓ Promove para produção OU faz rollback
```

## 🔧 Deploy Manual

### Via GitHub Actions (Web)

```
1. Vá em: Actions → CD - Zero-Downtime Deploy to Vercel
2. Clique: Run workflow
3. Selecione: production ou preview
4. Clique: Run workflow
```

### Via Linha de Comando

```bash
# Instale Vercel CLI
npm install -g vercel

# Deploy para produção
vercel --prod

# Deploy para preview
vercel
```

## 🏥 Verificar Saúde da Aplicação

### Produção

```bash
curl https://seu-app.vercel.app/api/health
```

### Local

```bash
# Inicie o servidor
pnpm start

# Teste health check
curl http://localhost:3000/api/health
```

**Resposta esperada:**

```json
{
  "status": "healthy",
  "timestamp": "2025-11-12T22:00:00.000Z",
  "version": "0.1.0",
  "uptime": 123.45
}
```

## ⏮️ Rollback em Caso de Problema

### Automático

O sistema faz rollback automaticamente se:
- ❌ Build falhar
- ❌ Health check falhar (após 5 tentativas)
- ❌ Qualquer erro crítico

### Manual via Vercel CLI

```bash
vercel rollback
```

### Manual via Vercel Dashboard

```
1. Acesse: https://vercel.com/dashboard
2. Vá em: Deployments
3. Encontre: último deployment estável
4. Clique: ⋯ → Promote to Production
```

## 📊 Monitoramento

### GitHub Actions

```
https://github.com/Cabreira97/SmartPonto/actions
```

- Ver logs em tempo real
- Status de cada step
- Deployment summary
- Notificações por email

### Vercel Dashboard

```
https://vercel.com/dashboard
```

- Analytics de performance
- Logs em tempo real
- Métricas de uso
- Alertas de erro

## 🐛 Troubleshooting

### Deploy falhou no CI

```bash
# Teste localmente primeiro
pnpm install
pnpm lint
pnpm build

# Veja os erros
pnpm exec tsc --noEmit
```

### Health Check Falhou

```bash
# 1. Teste localmente
pnpm start
curl http://localhost:3000/api/health

# 2. Verifique logs no Vercel
# 3. Aumente timeout se necessário (no workflow)
```

### Secrets Não Funcionam

```bash
# Verifique se os secrets estão configurados:
# GitHub → Settings → Secrets → Actions
#   ✓ VERCEL_TOKEN
#   ✓ VERCEL_ORG_ID (opcional)
#   ✓ VERCEL_PROJECT_ID (opcional)
```

## 📚 Recursos

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Documentação completa
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## ✅ Checklist de Deploy

Antes de fazer merge para `main`:

- [ ] Código testado localmente (`pnpm dev`)
- [ ] Lint passou (`pnpm lint`)
- [ ] Build passou (`pnpm build`)
- [ ] Health check funciona localmente
- [ ] CI passou no Pull Request
- [ ] Code review aprovado
- [ ] Documentação atualizada (se necessário)

Após merge:

- [ ] Verificar GitHub Actions
- [ ] Confirmar deployment no Vercel
- [ ] Testar health check em produção
- [ ] Verificar funcionalidade principal
- [ ] Monitorar logs por alguns minutos

## 🎯 Zero-Downtime Garantido

O sistema garante zero-downtime através de:

1. **Blue-Green Deployment** - Nova versão roda em paralelo
2. **Health Checks** - Verifica saúde antes de promover
3. **Gradual Traffic Shift** - Vercel redireciona tráfego gradualmente
4. **Rollback Automático** - Volta para versão anterior se houver erro
5. **Mantém Versão Anterior** - Versão antiga fica ativa durante deploy

---

**Dúvidas?** Consulte [DEPLOYMENT.md](./DEPLOYMENT.md) ou abra uma issue.
