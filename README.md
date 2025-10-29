🌿 CarbonoVerde — Plataforma Municipal de Monitoramento da Pegada de Carbono
============================================================================

📘 Contexto
-----------

A **pegada de carbono** é uma métrica essencial para medir o impacto das atividades humanas nas emissões de gases de efeito estufa (GEE).Cidades como **Joinville (SC)** têm papel central na geração dessas emissões, mas também grande potencial de **liderar ações sustentáveis**.

O **CarbonoVerde** nasce da necessidade de tornar visível e acessível, tanto para **gestores públicos** quanto para **cidadãos**, o mapeamento e a análise da pegada de carbono urbana.A ferramenta fornece dados, visualizações e relatórios que ajudam na tomada de decisões sustentáveis e na criação de políticas ambientais locais.

🎯 Objetivo do Projeto
----------------------

Desenvolver uma plataforma digital que permita:

*   **Gestores municipais (Admin)** cadastrarem empresas e monitorarem suas emissões;
    
*   **Managers (gestores principais)** administrarem o sistema e controlarem acessos;
    
*   Calcular e exibir o **índice de compensação de carbono** e o impacto ambiental de cada empresa;
    
*   Apresentar **mapas e relatórios** com informações consolidadas sobre emissões.
    

🧩 Perfis de Usuário e Funcionalidades
--------------------------------------

### 👨‍💼 Perfis

*   **Manager:** dono do sistema, com acesso total a todos os recursos.
    
*   **Admin:** responsável da prefeitura, pode cadastrar empresas e novos administradores.
    

### 🏢 Empresas

*   Cadastro de empresas com:
    
    *   Nome, CNPJ, data de registro e dados de consumo (água, energia, resíduos);
        
    *   Busca automática de endereço via **CEP**;
        
    *   Obtenção automática de **geolocalização (latitude e longitude)**;
        
*   Exibição em tabela com informações detalhadas e visualização futura em mapa interativo.
    

### 🗺️ Visualização Ambiental

*   Exibe empresas cadastradas e suas respectivas **áreas de compensação de carbono**;
    
*   Mostra o **percentual de cobertura verde** próximo às empresas;
    
*   Ajuda gestores a visualizar e planejar ações de sustentabilidade.
    

⚙️ Como Executar o Projeto Localmente
-------------------------------------

### 🧱 1. Backend — Spring Boot API

#### 🔧 Pré-requisitos

*   Java 17+
    
*   Maven
    
*   PostgreSQL (ou H2 para testes locais)
    

#### ▶️ Rodando o servidor

`   cd backend  mvn spring-boot:run   `

A API estará disponível em:👉 http://localhost:8080

#### ⚙️ Configuração de CORS

A aplicação permite chamadas do frontend:

`   http://localhost:5173   `

#### 🧾 Estrutura Simplificada da API

*   **Autenticação:** JWT + Spring Security
    
*   **Camadas:** Controller → Service → Repository
    
*   **Banco de dados:** PostgreSQL com Flyway para migrações
    
*   **Validações:** Bean Validation (Jakarta Validation)
    

### 💻 2. Frontend — React + Vite

#### 🔧 Pré-requisitos

*   Node.js 18+
    
*   npm
    

#### ▶️ Rodando o ambiente de desenvolvimento

`   cd frontend  npm install  npm run dev   `

O app rodará em:👉 http://localhost:5173

#### 🌎 Integrações

*   **API ViaCEP:** busca automática de endereço a partir do CEP.
    
*   **Geolocalização (Google Maps API ou geocode.xyz):** obtém latitude e longitude do endereço.
    
*   **PrimeReact + Tailwind:** estilização e layout responsivo.
    
*   **Axios:** comunicação com o backend.


  ## 👤 Usuário de Demonstração

**Função:** Manager (Administrador Geral)  
**Login:** admin  
**Senha:** 123456  

> ⚠️ Este usuário possui acesso total ao sistema para fins de demonstração.
    

## 🖼️ Demonstração

### video Demo


https://github.com/user-attachments/assets/25ad9acc-bb2d-4531-8e24-46125c35f21c




### Tela de login 

<img width="1877" height="1004" alt="Captura de tela 2025-10-29 120351" src="https://github.com/user-attachments/assets/67f6ec28-332b-42dd-b6a9-f8415680e4ae" />

### Tela de cadastro das empresas
<img width="1878" height="1002" alt="Captura de tela 2025-10-29 110832" src="https://github.com/user-attachments/assets/b8b410c1-c729-45ff-ad5a-3ade3500eac4" />

### Tela para cadastrar usuario (apenas maneger ou admin)
<img width="1875" height="996" alt="Captura de tela 2025-10-29 110956" src="https://github.com/user-attachments/assets/bc0f3d3b-a9e2-4703-987d-e3100e6cdb7c" />

### Tela da área das empresas 

<img width="1879" height="1002" alt="Captura de tela 2025-10-29 111826" src="https://github.com/user-attachments/assets/734e0385-9ee8-4b1e-a987-9c7750fedb33" />


    

### 🔗 Links Importantes

*   **Link da Demo:** (executar localmente via Vite e Spring Boot)
    
*   **Link do Repositório GitHub:** [https://github.com/SeuRepositorio/CarbonoVerde](https://github.com/SeuRepositorio/CarbonoVerde)
    
*   **Pitch de Apresentação (PDF):** CarbonoVerde - Pitch.pdf
    
*   **Relatório Técnico (PDF):** CarbonoVerde - Relatório Técnico.pdf
    

🧠 Requisitos do Projeto
------------------------

### 🔹 Funcionais

*   Cadastro e login com autenticação JWT;
    
*   Cadastro e listagem de empresas;
    
*   Busca automática de endereço por CEP;
    
*   Armazenamento de latitude/longitude;
    
*   Perfis distintos (Manager / Admin);
    
*   Exibição de informações ambientais no painel.
    

### 🔹 Não Funcionais

*   Acessível e responsivo (layout web adaptável);
    
*   Código modular e reutilizável;
    
*   Segurança via Spring Security e JWT;
    
*   Compatível com navegadores modernos;
    
*   API documentada e validada com Bean Validation.
    

🧩 Tecnologias Utilizadas
-------------------------

**Frontend:**React, Vite, Redux Toolkit, PrimeReact, TailwindCSS, Axios

**Backend:**Spring Boot, Spring Security (JWT), JPA / Hibernate, PostgreSQL, Flyway, Lombok, Bean Validation (Jakarta)

🚀 Comando Rápido de Execução Local (para demo)
-----------------------------------------------
# Backend (porta 8080)  
` cd backend  mvn spring-boot:run  # Em outro terminal:  cd frontend  npm run dev   `

Acesse no navegador:👉 [http://localhost:5173](http://localhost:5173)

📜 Licença
----------

Projeto acadêmico desenvolvido para fins educacionais.Todos os direitos reservados © **CarbonoVerde 2025**.
