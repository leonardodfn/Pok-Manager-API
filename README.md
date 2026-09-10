# 🎮 PokéManager API

![Node](https://img.shields.io/badge/Node.js-v20+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey)
![Architecture](https://img.shields.io/badge/Architecture-Clean%20Architecture-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

API RESTful para gerenciamento de Treinadores e catálogo de Pokémons, desenvolvida para a disciplina de **Projeto de Banco de Dados / Tópicos Especiais de Engenharia de Software** da Universidade Federal Fluminense (UFF).  
**Professor:** Carlos Eduardo Cardoso

📖 **Documentação Swagger UI:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)  
📄 **Documentação Completa da Arquitetura:** [md/DOCUMENTACAO.md](./md/DOCUMENTACAO.md)

---

## 📌 Sobre o Projeto

A **PokéManager API** é uma solução backend construída do zero ao longo do semestre letivo com foco em arquitetura de software de alta qualidade, desacoplamento e manutenibilidade.

O objetivo do sistema é permitir que Treinadores realizem cadastro, gerenciem suas coleções e montem seus times de até 6 Pokémons, integrando futuramente dados reais da PokéAPI para validação de estatísticas oficiais.

O projeto segue princípios rigorosos de **Clean Architecture**, **Domain-Driven Design (DDD)**, **SOLID** e tipagem estática.

### 📍 Status Atual: Entrega 1 (CheckPoint 10/09) — Concluída
- [x] Estrutura base em Clean Architecture com isolamento estrito de camadas
- [x] TypeScript estrito configurado com *path aliases* (`@domain`, `@application`, `@infrastructure`, `@main`)
- [x] Repositório em memória (`InMemoryPokemonRepository`) com dados semente
- [x] Contrato REST completo (CRUD do catálogo de espécies com filtro por tipo)
- [x] Documentação interativa via Swagger / OpenAPI 3.0 exposta em `/api/docs`
- [x] ESLint e Prettier integrados e sem alertas

---

## 🛠️ Tecnologias Implementadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **Node.js (v20+)** | Ambiente de execução JavaScript no servidor |
| **TypeScript (v6+)** | Superset tipado em modo estrito (`strict: true`, `noImplicitAny`) |
| **Express (v5)** | Framework minimalista para roteamento e middleware HTTP |
| **Clean Architecture** | Padrão arquitetural que isola o domínio de frameworks e banco de dados |
| **In-Memory Repository** | Armazenamento de dados em memória (`Map`) para testes e validações rápidas |
| **Swagger UI / OpenAPI 3.0** | Interface gráfica interativa para teste e visualização dos endpoints |
| **ESLint & Prettier** | Análise estática e formatação de código padronizada |
| **tsx** | Execução e recarregamento automático em desenvolvimento com suporte a path aliases |

---

## 📁 Esquema de Pastas (Clean Architecture)

A aplicação é dividida em 4 camadas independentes, onde a dependência aponta sempre de fora para dentro:

```
Pok-Manager-API/
├── especificacao/                       # Especificação oficial do professor (PDF)
├── md/                                  # Documentações aprofundadas
│   └── DOCUMENTACAO.md                  # Guia arquitetural completo e detalhamento das entregas
├── src/
│   ├── domain/                          # CAMADA 1: DOMÍNIO (Regras de Negócio Puras)
│   │   ├── entities/
│   │   │   └── Pokemon.ts               # Entidade de negócio Pokemon e métodos de atualização
│   │   ├── repositories/
│   │   │   └── IPokemonRepository.ts    # Contrato (Interface) com as operações de persistência
│   │   └── errors/
│   │       ├── PokemonNotFoundError.ts  # Erro: espécie não encontrada
│   │       └── PokemonAlreadyExistsError.ts # Erro: duplicidade de espécie
│   │
│   ├── application/                     # CAMADA 2: APLICAÇÃO (Casos de Uso)
│   │   ├── dtos/                        # Objetos de transferência de dados (Input/Output)
│   │   │   ├── CreatePokemonDTO.ts
│   │   │   ├── UpdatePokemonDTO.ts
│   │   │   └── PokemonResponseDTO.ts
│   │   └── use-cases/                   # Ações orquestradas pelo sistema
│   │       ├── ListPokemonsUseCase.ts   # Listagem com suporte a filtro por tipo
│   │       ├── GetPokemonByIdUseCase.ts # Busca de espécie por identificador
│   │       ├── CreatePokemonUseCase.ts  # Validação de regras e criação de Pokémon
│   │       ├── UpdatePokemonUseCase.ts  # Atualização dos atributos e dados
│   │       └── DeletePokemonUseCase.ts  # Remoção do catálogo
│   │
│   ├── infrastructure/                  # CAMADA 3: INFRAESTRUTURA (Tecnologias Externas)
│   │   ├── repositories/
│   │   │   └── InMemoryPokemonRepository.ts # Implementação em memória com dados semente
│   │   ├── http/
│   │   │   ├── controllers/
│   │   │   │   └── PokemonController.ts # Adaptador HTTP (trata req e res do Express)
│   │   │   ├── routes/
│   │   │   │   ├── pokemon.routes.ts    # Mapeamento dos verbos HTTP para o controller
│   │   │   │   └── index.ts             # Roteador central (/api/v1)
│   │   │   ├── middlewares/
│   │   │   │   └── errorHandler.ts      # Tratamento global de exceções (400, 404, 409, 500)
│   │   │   └── docs/
│   │   │       ├── swagger.json         # Especificação OpenAPI 3.0
│   │   │       └── swagger.ts           # Middleware que renderiza o Swagger UI
│   │   └── errors/
│   │       └── AppError.ts              # Exceções operacionais HTTP
│   │
│   └── main/                            # CAMADA 4: COMPOSIÇÃO (Entrypoint e Injeção)
│       ├── config/
│       │   ├── app.ts                   # Inicialização de middlewares e rotas Express
│       │   └── env.ts                   # Leitura tipada de variáveis de ambiente
│       ├── factories/
│       │   └── makePokemonController.ts # Instanciação e injeção manual de dependências
│       └── server.ts                    # Ponto de entrada que escuta requisições na porta
├── .env.example                         # Exemplo de configuração de ambiente
├── eslint.config.mjs                    # Configuração moderna do ESLint
├── .prettierrc                          # Regras de formatação do Prettier
├── tsconfig.json                        # Configurações do TypeScript e path aliases
└── package.json                         # Dependências e scripts de execução
```

---

## ⚙️ Requisitos para Rodar

### Pré-requisitos
- **Node.js**: versão `20.x` ou superior (testado na versão 24)
- **npm**: versão `10.x` ou superior
- **Porta 3000** disponível na máquina (configurável via `.env`)

---

## 🚀 Como Executar Localmente

### 1. Clonar e Acessar o Projeto
```bash
git clone https://github.com/seu-usuario/pokemanager-api.git
cd Pok-Manager-API
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo de exemplo para criar o `.env`:
```bash
cp .env.example .env
```
*(Conteúdo padrão: `PORT=3000` e `NODE_ENV=development`)*

### 3. Instalar Dependências
```bash
npm install
```

### 4. Executar em Desenvolvimento
Inicie o servidor com recarregamento automático (*hot-reload*):
```bash
npm run dev
```

O terminal exibirá:
```
PokéManager API rodando em http://localhost:3000
Documentação Swagger disponível em http://localhost:3000/api/docs
```

### 5. Compilar e Rodar em Produção (Opcional)
```bash
# Compilar TypeScript para JavaScript (dist/)
npm run build

# Executar a aplicação compilada
npm run start
```

### 6. Scripts de Qualidade de Código
```bash
# Executar análise do ESLint
npm run lint

# Aplicar correções automáticas de formatação com Prettier
npm run format
```

---

## 📡 Endpoints da Entrega 1

Todos os endpoints da API estão versionados sob o prefixo `/api/v1`:

| Método | Rota | Descrição | Status de Sucesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Healthcheck simples da API | `200 OK` |
| `GET` | `/api/docs` | Documentação interativa Swagger UI | `200 OK` |
| `GET` | `/api/v1/pokemons` | Lista todas as espécies cadastradas | `200 OK` |
| `GET` | `/api/v1/pokemons?type=electric` | Filtra espécies por tipo elemental | `200 OK` |
| `GET` | `/api/v1/pokemons/:id` | Busca detalhes de uma espécie por ID | `200 OK` |
| `POST` | `/api/v1/pokemons` | Cadastra manualmente uma espécie no catálogo | `201 Created` |
| `PUT` | `/api/v1/pokemons/:id` | Atualiza dados de uma espécie existente | `200 OK` |
| `DELETE` | `/api/v1/pokemons/:id` | Remove uma espécie do catálogo | `204 No Content` |

---

## 🧪 Exemplos de Requisições (cURL)

A aplicação já vem com 5 espécies sementes pré-cadastradas na memória para teste imediato: **Bulbasaur (#1)**, **Charmander (#4)**, **Squirtle (#7)**, **Pikachu (#25)** e **Gengar (#94)**.

### Listar catálogo com filtro de tipo
```bash
curl -X GET "http://localhost:3000/api/v1/pokemons?type=electric"
```

### Buscar espécie por ID
```bash
curl -X GET http://localhost:3000/api/v1/pokemons/25
```

### Cadastrar nova espécie (POST)
```bash
curl -X POST http://localhost:3000/api/v1/pokemons \
  -H "Content-Type: application/json" \
  -d '{
    "id": "143",
    "name": "snorlax",
    "types": ["normal"],
    "attributes": {
      "hp": 160,
      "attack": 110,
      "defense": 65,
      "specialAttack": 65,
      "specialDefense": 110,
      "speed": 30
    },
    "height": 21,
    "weight": 4600,
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
  }'
```

### Atualizar espécie existente (PUT)
```bash
curl -X PUT http://localhost:3000/api/v1/pokemons/143 \
  -H "Content-Type: application/json" \
  -d '{
    "weight": 4700,
    "attributes": {
      "attack": 120
    }
  }'
```

### Remover espécie (DELETE)
```bash
curl -X DELETE http://localhost:3000/api/v1/pokemons/143
```

---

## 📋 Exemplos de Respostas da API

### 1. Resposta de Sucesso ao Buscar ou Criar Pokémon (`200 OK` / `201 Created`)
```json
{
  "id": "25",
  "name": "pikachu",
  "types": [
    "electric"
  ],
  "attributes": {
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "specialAttack": 50,
    "specialDefense": 50,
    "speed": 90
  },
  "height": 4,
  "weight": 60,
  "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  "createdAt": "2026-09-10T19:49:06.702Z",
  "updatedAt": "2026-09-10T19:49:06.702Z"
}
```

### 2. Resposta de Listagem com Filtro por Tipo (`200 OK`)
`GET /api/v1/pokemons?type=electric`
```json
[
  {
    "id": "25",
    "name": "pikachu",
    "types": [
      "electric"
    ],
    "attributes": {
      "hp": 35,
      "attack": 55,
      "defense": 40,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 90
    },
    "height": 4,
    "weight": 60,
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    "createdAt": "2026-09-10T19:49:06.702Z",
    "updatedAt": "2026-09-10T19:49:06.702Z"
  }
]
```

### 3. Respostas de Erro Padronizadas

**Pokémon Não Encontrado (`404 Not Found`):**
```json
{
  "status": "error",
  "message": "Pokémon com identificador '999' não foi encontrado."
}
```

**Espécie Já Cadastrada (`409 Conflict`):**
```json
{
  "status": "error",
  "message": "Pokémon com o nome 'pikachu' já está cadastrado no catálogo."
}
```

**Parâmetros Inválidos (`400 Bad Request`):**
```json
{
  "status": "error",
  "message": "O campo \"name\" é obrigatório e deve ser uma string válida."
}
```

---

## 🗺️ Roadmap do Projeto (Próximas Entregas)

- **Entrega 2 (08/10):** Persistência relacional com PostgreSQL e Prisma ORM, validação de requisições com Zod e gateway para consumo da PokéAPI oficial.
- **Entrega 3 (05/11):** Módulo completo de autenticação JWT, Refresh Token, autorização baseada em papéis (RBAC) e proteções OWASP (Helmet, CORS, Rate Limit).
- **Entrega 4 (03/12):** Conteinerização com Docker e Docker Compose, suíte completa de testes automatizados (Vitest/Supertest) e pipeline de CI/CD.