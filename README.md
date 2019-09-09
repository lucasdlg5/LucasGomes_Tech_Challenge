# Lucas_Tech_Challenge

Descrição do Desafio encontra-se no link a seguir:

https://github.com/gypz/tech_challenge

#### TL;DR

O **Back-End** do projeto deverá ser feito em **Python ou Node.JS**, utilizando um framework de sua escolha.

Backend deve contemplar as seguintes funcionalidades

  - **GET**: Listará todas as solicitações de cartões no sistema.
  - **POST**: Deve inserir uma nova solicitação de cartão.
  - **DELETE**: Remove uma solicitação 

Deverá ser criada uma rotina que verificará a pontuação de crédito do usuário que será uma rotina que devolva uma pontuação **aleatória** entre 1 a 999, para ser utilizada como score de credito.

Dependendo do score retornado a solicitação é aprovada ou não, também alterando o seu limite de crédito, que deverá seguir a seguinte lógica:

| Score     | Crédito                                        |
| --------- | ---------------------------------------------- |
| 1 a 299   | Reprovado                                      |
| 300 a 599 | R$1000,00                                      |
| 600 a 799 | 50% da renda informada, valor mínimo R$1000,00 |
| 800 a 950 | 200% da renda informada                        |
| 951 a 999 | Sem limites, considerar R$ 1.000.000           |

7 Dias para desenvolvimento
- Seu código deve estar disponível em um repositório no Github.
- Você pode utilizar plataformas como Heroku ou AWS para nos mostrar a aplicação funcionando em produção.
- Quando estiver pronto nos envie o link do repositório.
# Ferramentas utilizadas

## Backend
- Express
- NodeJS
- Mongoose
- Body-Parser

## Banco de Dados
- MongoDB Atlas ou mLab MongoDB

## Front-End
- VueJS
- AXIOS
- Vue Material
- Vue-Router
- Material Design

## Deploy
- Heroku
- NPM

Disponivel para acesso em:
https://lucasgomestechchallenge.herokuapp.com/
