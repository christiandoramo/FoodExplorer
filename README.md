# Food Explorer"

## Meus requisitos levantados para o projeto:

### Usuário não autenticado
 * Registro de usuario - create | nao autenticado
 * Login com autenticação - create | nao autenticado

### Usuário autenticado
 * Logout
 * Atualização de dados do usuario (Extra/Opcional) - update
 * listar pratos por categoria - index
 * mostrar prato - show
 * pode buscar pratos por ingredientes ou pelo nome - index
 * pode favoritar itens listados
 * listar produtos favoritos - index favorite pode navegar até os produto

### Usuário comum

 * poder adicionar e remover quantidade de pratos para incluir no pedido
 * realizar inclusão da quantidade de itens pedidos - create item_product
 * itens do pedido são armazenados em local storage durante navegação (Extra/opcional)
 * inclusão de itens pedidos numa entidade carrinho após logout (Extra/opcional) - create item_product
 * mostrar meu pedido com valor total, itens-produto com quantidade e valor final - (um tipo de show usando o localStorage por exemplo, o cart deve ser recarregado no localstorage, o cart só serve para o logout - ele é criado - create cart ou atualizado - update? cart, e para a finalização da compra - delete? cart)
 * é possível excluir cada item pedido nessa tela - delete item_product
 * nessa tela mostra as formas de pagamento e status do pedido - se pagamento aprovado - create o pedido é criado - create, o cart e localStorage devem ser deletados - delete? cart
 * no final do procedimento mostra que o pedido foi entregue, tela deve ser redirecionada a outro local.
 * listar histórico de pedidos - index pedidos e show pedido podendo rever tela de pedido - vendo mais detalhes e status do pedido

### Admin
 * pode criar pratos para o restaurante - create prato
 * ao ver um prato pode editá-lo ao invez de incluir em carrinho - update prato
 * em vez de historico de pedidos pode ver pedidos - index de pedido
 * para cada produto pode ver detalhes e atualizar o status do pedido existente - index e update de pedido
 * o admin não pode favoritar mais e em vez de ver meus favoritos o admin pode ver os produtos mais favoritados "Favoritos" mostrando o nome de usuario e seu avatar (Minhas modificações - opcional) - index favoritos


#### Modelo ER
![modelo er](./ER.png)

# Front e Back Food Explorer"
### Modificações escolhidas por mim -
### em vez de usar sqlite pegando o DB pelo aquivo database.db, 
### escolhi usar o DB postgres em um container Docker,
### também escolhi usar typescript + jest

#### FIGMA: https://www.figma.com/file/vAq7WgKTPmFqzZ5YIROS9i/food-explorer-v2-(Community)?node-id=201%3A1532&mode=dev
#### modelo ER feito no DRAWSQL: https://drawsql.app/


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
criando o app next:
npm install -g create-next-app
npx create-next-app nome-do-seu-projeto
