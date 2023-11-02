# API Taxo

1 º - Primeiro passo tenha os requisitos abaixo:

- Node v20.9.0
- NPM 10.2.2
- NPX 10.2.2
 
2 º - Segundo passo, renomeie o arquivo "sample_db.sqlite" que está dentro do diretório "database", para "database.sqlite"

3 º - Terceiro passo, execute o comando "npm install" para instalar o projeto e seus pacotes

4 º - Quarto passo, executar o comando "npx sequeliza-cli db:migrate"

5 º - Quinto passo, executar o comando "npx sequelize-cli db:seed:all"

6 º - Sexto passo, executar o comando "npm start" para ele rodar o servidor

7 º (Opcional) - Sétimo passo opcional, caso você tenha algum servidor TCP sendo rodado na porta padrão dessa aplicação(7548), você pode alterar a porta no arquivo "config/default.json" e rodar novamente o comando "npm start"

8 º - Oitavo passo, você pode testar a requisição abaixo tanto no navegador, quanto via algum REST Client(Postman, SoapUI, Curl, etc)

API:
http://localhost:7548/awards/winners

# Testes

Para executar os testes, execute o comando "npm run test" os testes implementados foram feitos utilizando o "Mocha" e o "Chai"