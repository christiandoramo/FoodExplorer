# Front e Back Food Explorer"
### Modificação escolhida por mim -
### em vez de usar sqlite no windows e pegando o DB como um aquivo database.db, 
### escolhi usar o DB postgres em um container dpcker
### também escolhi usar de Typescript + jest para boas práticas

#### FIGMA: https://www.figma.com/file/vAq7WgKTPmFqzZ5YIROS9i/food-explorer-v2-(Community)?node-id=201%3A1532&mode=dev
#### modelo ER feito no DRAWSQL: https://drawsql.app/
#### Modelo ER
![modelo er](./Modelo%20entidade%20relacionamento.png)

#### REQUISITOS DO PROJETO: https://app.rocketseat.com.br/explorer/final-challenge

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


anotações:

// Para rodar o knex ->
// npm install knex --save
// npx knex init - gera o novo knexfile
// npx knex migrate:make <nome da migration>

// pool: {
//   afterCreate: (connection, callback) => connection.run("PRAGMA foreign_keys = ON", callback)
// },
// Habilita o uso do delete onCascade no sqlite

// para rodar - npx knex migrate:latest - isso sem criar um script no package.json

para usar o ES6 - type: module e capturar o ccaminho das pastas->
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

npx knex migrate:list - veja migrates nao upadas
npx knex migrate:down <nome> - para desmontar migrates
npx knex migrate:up - veja montar as migrates - agora atualizadas
npx knex migrate:latest - pode atualizar os desmontados

inicialmente rodar o banco de dados Postgres com o container docker e instalar npm pg 