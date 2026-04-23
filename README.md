# 🛒 Loja Online - Full Stack 

Este é um projeto de e-commerce completo desenvolvido para colocar em prática conceitos avançados de Back-end, integração com banco de dados relacional e deploy em nuvem. O sistema conta com fluxo de autenticação, gerenciamento de carrinho e persistência de pedidos.

## 🚀 Funcionalidades

- **Autenticação de Usuários:** Cadastro e Login com criptografia de senha e tokens JWT.
- **Catálogo de Produtos:** Listagem dinâmica vinda do banco de dados MySQL.
- **Carrinho de Compras:** Sistema de adição/remoção de itens com persistência local.
- **Checkout:** Finalização de compra com criação automática de pedidos e itens de pedido.
- **Histórico de Compras:** Área do usuário para visualizar pedidos anteriores com detalhes dos produtos.

## 🛠️ Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework Web:** [Express](https://expressjs.com/)
- **ORM:** [Sequelize](https://sequelize.org/) (MySQL)
- **Banco de Dados:** [MySQL](https://www.mysql.com/) (Hospedado no Railway)
- **Segurança:** Bcrypt (Hash de senhas) e JSON Web Token (Sessões)
- **Deploy:** [Railway](https://railway.app/)

## 🏗️ Arquitetura e Desafios Técnicos

O projeto utiliza o padrão **MVC (Model-View-Controller)**, o que garantiu uma organização clara das rotas e lógicas de negócio.

### Principais desafios superados:
- **Relacionamentos Complexos:** Implementação de associações `HasMany` e `BelongsTo` entre tabelas de Pedidos, Produtos e Itens de Pedido para garantir a integridade dos dados.
- **Estratégia de Deploy:** Configuração de variáveis de ambiente (`dotenv`) e porta dinâmica para rodar o servidor no Railway.
- **Consultas Relacionais:** Uso de `include` no Sequelize para buscar detalhes de produtos vinculados a um pedido específico em uma única requisição.

## 🔧 Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
  git clone https://github.com/Kaio991/Loja-Online-Deshboard.git