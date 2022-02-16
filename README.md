## O que é esse projeto?

É um conversor para realizar importação de novos usuários para o Keycloak


## Como funciona?

Digamos que você tem um array de objetos contendo dados de usuários, e deseja cadastrar todos eles no keycloak de uma vez só. 
Para isso, você vai precisar transformar esse arquivo em um formato específico. Esse formato está descrito em **dto/user.import.dto.ts**

Atualmente, existem 3 conversores já prontos, todos do banco do motor. Um da tabela people_people, outro da company_companies, e o outro da tabela agencies (mesclado com a tabela phones)
**Mas você pode fazer quantos quiser e precisar**, tomando como base os já existentes

## Como eu faço essas conversões? Como eu uso esse programa afinal de contas?

Primeiramente veja como foram feitas as classes dentro da pasta **converters**, elas são bem simples de entender e básicas.
A única coisa que você precisa fazer é executar os métodos **convert** e depois o método **export**, e __voilà__, seus arquivos .json serão gerados na pasta raíz do projeto, prontos para serem importados direto pelo painel do Keycloak

## Certo, mas isso é só a teoria, como eu **realmente** executo esse programa?

Antes de mais nada dê uma olhada no arquivo **execute.ts**, é ele quem faz a parada toda funcionar.
O que você deve fazer, então, é criar um arquivo no mesmo estilo desse **execute.ts** aí, usando os arquivos que você quer converter, e então rodar diretamente esse próprio arquivo

Para executar o arquivo, primeiro voce deve compilar para .js, através do comando **npx tsc**. Depois de compilar, basta rodar com o comando **node** mesmo, referenciando o seu arquivo de execução. 
Por exemplo:
```
npx tsc
node .\execute.js
```

Depois é só abrir o painel do Keycloak e importar os dados.


## E o que é aquela pasta "users" lá?
São apenas os dados de usuários raw que eu gerei do banco oficial e resolvi deixá-los na pasta do projeto só como exemplos.

