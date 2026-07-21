# Configuração do Login com Google

## Passo 1: Criar um Projeto no Google Cloud Console

1. Acesse https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs e Serviços** > **Credenciais**
4. Clique em **Criar Credenciais** > **ID do cliente OAuth**
5. Escolha **Aplicativo da Web**

## Passo 2: Configurar a Tela de Consentimento OAuth

1. Em **APIs e Serviços** > **Tela de consentimento OAuth**
2. Escolha **Externo** (ou interno se for só para sua organização)
3. Preencha:
   - **Nome do aplicativo**: Where?
   - **Domínios autorizados**: localhost
   - **Escopos**: email, profile, openid
4. Adicione **usuários de teste** (seu email)

## Passo 3: Configurar URIs de Redirecionamento

No ID do cliente OAuth, configure:

- **Origens JavaScript autorizadas**:
  - `http://localhost:3000`

- **URIs de redirecionamento autorizados**:
  - `http://localhost:3000/api/auth/google/callback`

## Passo 4: Adicionar Credenciais ao .env

Copie o **Client ID** e **Client Secret** gerados para o arquivo `.env`:

```
GOOGLE_CLIENT_ID=123456789-xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx-xxxxx-xxxxx
```

## Passo 5: Reiniciar o Servidor

```bash
# Pare o servidor (Ctrl+C) e inicie novamente
node server.js
```

O login com Google estará disponível em:
- `http://localhost:3000/login.html`
- Botão **"Entrar com Google"**
