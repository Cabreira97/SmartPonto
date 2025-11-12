# Deploy / CI/CD com Zero-Downtime

Este repositório implementa um pipeline completo de CI/CD com deploy zero-downtime usando GitHub Actions e Vercel.

## 🎯 O que é Zero-Downtime Deployment?

Zero-downtime deployment (deploy sem tempo de inatividade) é uma estratégia de implantação onde a aplicação permanece **100% disponível** durante todo o processo de atualização. Não há interrupção do serviço para os usuários.

### Como funciona?

1. **Build da nova versão** - Nova versão é compilada em paralelo
2. **Health check** - Sistema verifica se a nova versão está saudável
3. **Troca gradual** - Tráfego é gradualmente redirecionado para a nova versão
4. **Rollback automático** - Se houver falhas, sistema volta para versão anterior
5. **Limpeza** - Versão antiga é desativada apenas após sucesso

## 📋 Workflows do GitHub Actions

Este projeto possui dois workflows principais:

### 1. CI (Continuous Integration) - `.github/workflows/ci.yml`

Executa em **pull requests** e **push para main**:

**Passos executados:**
```
✓ Checkout do código
✓ Setup Node.js 20 + pnpm
✓ Instalação de dependências (pnpm install --frozen-lockfile)
✓ Verificação de tipos TypeScript (tsc --noEmit)
✓ Análise de código (eslint)
✓ Build de produção (next build)
✓ Teste do endpoint de health check
✓ Upload de artefatos de build
```

**Proteções:**
- Falha se houver erros de tipo
- Falha se houver violações de lint
- Falha se o build não completar
- Testa endpoint de saúde da aplicação

### 2. CD (Continuous Deployment) - `.github/workflows/cd.yml`

Executa em **push para main** ou **manualmente** via workflow_dispatch:

**Passos executados:**
```
✓ Checkout do código
✓ Setup Node.js 20 + pnpm
✓ Instalação de dependências
✓ Build do projeto
✓ Deploy para Vercel (produção)
✓ Health check com retries (5 tentativas)
✓ Resumo do deployment
```

**Recursos de Zero-Downtime:**
- ✅ Build antes do deploy
- ✅ Health check automático após deploy
- ✅ Retries em caso de falha temporária
- ✅ Vercel gerencia blue-green deployment
- ✅ Rollback automático em caso de erro

## 🔧 Configuração Necessária

### Secrets do GitHub

Configure os seguintes secrets em **Settings → Secrets and variables → Actions**:

1. **`VERCEL_TOKEN`** (obrigatório)
   - Obtenha em: https://vercel.com/account/tokens
   - Permite o GitHub Actions fazer deploy no Vercel

2. **`VERCEL_ORG_ID`** (opcional, recomendado)
   - Encontre em: Vercel Dashboard → Settings → General
   - Melhora a performance do deploy

3. **`VERCEL_PROJECT_ID`** (opcional, recomendado)
   - Encontre em: Project Settings → General
   - Garante deploy no projeto correto

### Configuração do Vercel

O arquivo `vercel.json` na raiz do projeto configura:

- **Região**: `gru1` (São Paulo, Brasil) - baixa latência para usuários brasileiros
- **Build command**: `pnpm build`
- **Framework**: Next.js
- **Functions memory**: 1024 MB
- **Auto-alias**: URLs de preview automáticas
- **Auto-cancelation**: Cancela builds antigos automaticamente

## 🚀 Como Fazer Deploy

### Deploy Automático (Recomendado)

1. **Merge/Push para main**
   ```bash
   git checkout main
   git pull origin main
   git merge sua-branch
   git push origin main
   ```

2. O GitHub Actions automaticamente:
   - Executa CI (testes, lint, build)
   - Executa CD (deploy com zero-downtime)
   - Verifica saúde da aplicação
   - Notifica status

### Deploy Manual via GitHub

1. Vá em **Actions → CD - Zero-Downtime Deploy to Vercel**
2. Clique em **Run workflow**
3. Selecione o ambiente (production/preview)
4. Clique em **Run workflow**

### Deploy Manual Local

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy para produção
vercel --prod --token seu_vercel_token

# Deploy para preview
vercel --token seu_vercel_token
```

## 🏥 Health Check Endpoint

O projeto inclui um endpoint de saúde em `/api/health`:

**Request:**
```bash
curl https://seu-app.vercel.app/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-12T22:00:00.000Z",
  "version": "0.1.0",
  "uptime": 123.45
}
```

Este endpoint é usado pelo workflow de CD para verificar se o deploy foi bem-sucedido.

## 🔄 Estratégia de Rollback

Se algo der errado:

### Rollback Automático
- Vercel mantém a versão anterior ativa
- Health check falha → deploy não é promovido
- Versão anterior continua servindo tráfego

### Rollback Manual

**Via Vercel Dashboard:**
1. Vá em **Deployments**
2. Encontre o deployment anterior estável
3. Clique em **⋯** → **Promote to Production**

**Via CLI:**
```bash
vercel rollback
```

## 📊 Monitoramento

### GitHub Actions
- Veja logs em tempo real em **Actions**
- Receba notificações por email em caso de falha
- Visualize deployment summary após cada deploy

### Vercel Dashboard
- Analytics de performance
- Logs em tempo real
- Métricas de uso
- Alertas de erro

## 🎨 Ambientes de Deploy

### Production (main)
- URL: https://smart-ponto.vercel.app
- Trigger: Push para branch main
- Zero-downtime garantido
- Health checks obrigatórios

### Preview (PRs)
- URL: https://smart-ponto-git-{branch}.vercel.app
- Trigger: Pull Request
- Ambiente de teste
- Deploy automático

## 💡 Melhores Práticas

1. **Sempre teste localmente**
   ```bash
   pnpm dev
   pnpm build
   pnpm start
   ```

2. **Use feature branches**
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

3. **Crie Pull Requests**
   - CI roda automaticamente
   - Preview deploy é criado
   - Revisão de código antes do merge

4. **Monitore os deployments**
   - Verifique logs no GitHub Actions
   - Confirme health check passou
   - Teste a aplicação após deploy

5. **Mantenha dependências atualizadas**
   ```bash
   pnpm update --interactive
   ```

## 🔒 Segurança

- ✅ Secrets nunca expostos no código
- ✅ Dependências verificadas antes do deploy
- ✅ Build isolado em ambiente limpo
- ✅ Health checks previnem deploys quebrados
- ✅ Rollback automático em falhas

## 📚 Recursos Adicionais

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Documentation](https://vercel.com/docs/deployments/overview)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Zero-Downtime Deployment Strategies](https://www.vercel.com/docs/deployments/zero-downtime)

## 🆘 Troubleshooting

### Build falha no CI
```bash
# Teste localmente
pnpm install
pnpm build

# Verifique erros de tipo
pnpm exec tsc --noEmit

# Verifique lint
pnpm lint
```

### Deploy falha no Vercel
1. Verifique se `VERCEL_TOKEN` está configurado
2. Confirme que o projeto existe no Vercel
3. Revise logs do GitHub Actions
4. Teste deploy manual local

### Health check falha
1. Verifique se `/api/health` está acessível
2. Teste localmente: `curl http://localhost:3000/api/health`
3. Aumente timeout se necessário
4. Verifique logs do Vercel

---

**Dúvidas?** Abra uma issue ou consulte a documentação dos links acima.

