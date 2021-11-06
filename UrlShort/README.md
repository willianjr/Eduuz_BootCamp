# URL SHORT

## _Sistema de encurtador de URL_

_UrlShort é desenvolvido sobre NodeJs._

### #BackEnd

-   NodeJS
-   TypeScript
-   Express
-   EsLint
-   Prettier
-   TypeORM
-   SQLite
-   Class Validator
-   Uuid
- 	Jest

## Features

1. Cadastro de URL short
2. Redirect para URL

# Instalação das dependências

_Após fazer a copia do repositório executar o comando abaixo para fazer download de todos as dependncias_^

> NPM i

## Rodando a migrations

_Para criação do banco de dados será necessário executar o comando abaixo_^

> NPM run typeorm migration:run

-   CreateTable_Url : Criação da tabela de URLs

## Rodando o Projeto

_O projeto deverá ser rodado pelo comando abaixo_^

> NPM run dev:server
> O servidor será iniciado em : http://localhost:3031

## EndPoints

### URLs


### 1. Criação de plano

> _[post] /shorten_

-   Body
    {
    "originURL": string,

    }

---

### 2. Busca uma url específica e redireciona para a url original

-   Parametros
    { :hash: string }
    > _[get] /::hash_

---

## Testes

_Para a realização dos testes é necessário utilizar o comando abaixo_^

> NPM test

> O Documento abaixo refere ao roteiro de testes.
> [Documento](__tests__/__roteiros__/__index.md)
