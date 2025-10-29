# CarbonoVerde Frontend

## Contexto
A pegada de carbono é uma métrica fundamental para mensurar o impacto das atividades humanas na emissão de gases de efeito estufa (GEE), sendo essencial para o enfrentamento das mudanças climáticas. No contexto urbano, cidades como Joinville desempenham um papel central na geração dessas emissões, mas também possuem grande potencial para promover soluções e políticas de sustentabilidade.

Este projeto nasce da necessidade de tornar visível e acessível, tanto para gestores públicos quanto para cidadãos, o mapeamento e a análise da pegada de carbono da cidade de Joinville. A ferramenta busca incentivar ações de mitigação e adaptação, promovendo uma cidade mais sustentável e resiliente.

A iniciativa de monitorar a pegada de carbono proporciona embasamento para decisões responsáveis, engajamento da sociedade e cumprimento de metas ambientais locais, nacionais e globais, contribuindo positivamente para o futuro das próximas gerações.

## Objetivo
Este projeto tem como objetivo mapear e calcular a pegada de carbono da cidade de Joinville, apresentando informações, relatórios e visualizações para acompanhamento por parte de gestores municipais e cidadãos.

## Visão Geral
O frontend é desenvolvido com React e utiliza arquitetura modular para oferecer uma interface responsiva e interativa. Ele se comunica com APIs para obter dados relevantes sobre emissões, bairros, operações e outros indicadores ambientais.

## Estrutura do Projeto
```
- public/             # Arquivos públicos e estáticos
- src/
  - assets/           # Imagens e estilos básicos (CSS)
  - components/       # Componentes reutilizáveis de interface
  - data/             # Conjuntos de dados locais
  - router/           # Configuração de rotas da aplicação
  - services/         # Serviços para consumo de APIs e lógica relacionada
  - slices/           # Slices de estado global com Redux (ex: autenticação)
  - store/            # Configuração e criação da store Redux
  - views/            # Telas principais (pages/views)
  - style.css         # Estilos globais
  - App.jsx           # Componente raiz da aplicação
  - main.jsx          # Ponto de entrada do React
```

## Telas Principais
- **Login:** Para autenticação de usuários (LoginView, LoginCityhall)
- **Dashboard:** Painel com visão geral dos dados ambientais (DashboardView)
- **Clientes, Operações e Pedidos:** Telas para gestão de dados de clientes, operações e pedidos (CustomersView, OperationsView, OrdersView)
- **Configurações:** Opções e ajustes do sistema (SettingsView)

## Instalação e Execução
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
3. O sistema pode ser acessado normalmente via navegador na porta padrão informada pelo Vite.

## Configuração
- As rotas principais estão em `src/router/index.js`.
- A comunicação com a API está em `src/services/` (ex: `api.js`, `camadaBairros.js`).
- Gerenciamento de estado global via Redux Toolkit em `src/slices/` e `src/store/`.

## Tecnologias Principais
- React
- Redux Toolkit
- Vite
- CSS

## Contato
Dúvidas ou sugestões? Entre em contato com os desenvolvedores do projeto.
